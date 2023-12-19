import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useGetUsersCategoriesQuery } from '../../redux/api/slices/categorySlice'
import Button from '../buttons/Button'
import { LabelPlus } from '../icons'
import Tooltip from '../tooltip/Tooltip'
import Select from './Select'
import { CategoryDTO, CategoryType } from 'shared-types'
import { Option } from './Select'

type SelectCategoryProps = {
  value: number | string | undefined | null
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleCategoryOpen: () => void
  categoryTypes?: CategoryType[]
}

const SelectCategory = ({
  value,
  handleChange,
  handleCategoryOpen,
  categoryTypes = ['ACCOUNT', 'GOAL', 'TRANSACTION']
}: SelectCategoryProps) => {
  // USER DATA
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)
  const { data: categories } = useGetUsersCategoriesQuery({
    id: currentUser?.id
  })

  // UTILS
  const getCategoryOptions = (categories: CategoryDTO[] | undefined) => {
    if (categories) {
      const options: Option[] = categories
        .filter((c) => categoryTypes.includes(c.categoryType))
        .map((c) => {
          const option: Option = {
            id: c.id,
            name: c.name
          }
          return option
        })
      return options
    }

    return []
  }

  const [category, setCategory] = useState(value)

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let id = e.target.value
    setCategory(id)
    handleChange(e)
  }

  return (
    <div className="flex flex-row w-full gap-4">
      <Select
        value={category ? category : ''}
        label={'Kategoria'}
        options={getCategoryOptions(categories)}
        fullWidth
        placeholder={'Wybierz kategorię ...'}
        handleSelect={handleSelect}
      />
      <Tooltip text={'Zarządzaj kategoriami'}>
        <Button
          variant="icon-only"
          color="primary"
          size="small"
          IconLeft={LabelPlus}
          onClick={handleCategoryOpen}
          iconClassName="text-md"
          className="mt-4"
        />
      </Tooltip>
    </div>
  )
}

export default SelectCategory
