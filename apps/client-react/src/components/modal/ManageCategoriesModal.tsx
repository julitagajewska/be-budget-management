import Modal from './Modal'
import {
  useCreateCategoryMutation,
  useGetUsersCategoriesQuery
} from '../../redux/api/slices/categorySlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import React, { useEffect, useState } from 'react'
import { CategoryDTO, CategoryType } from 'shared-types'
import Button from '../buttons/Button'
import { Plus } from '../icons'
import Input from '../inputs/Input'
import Select from '../inputs/Select'
import ModalHeader from './sections/ModalHeader'
import Radio from '../inputs/Radio'
import TableHeadCell from '../table/TableHeadCell'
import CategoriesTableRow from '../table/CategoriesTableRow'

type ManageCategoriesModalProps = {
  open: boolean
  handleClose: () => void
}

const ManageCategoriesModal = ({ open, handleClose }: ManageCategoriesModalProps) => {
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)
  const { data: categories } = useGetUsersCategoriesQuery({
    id: currentUser?.id
  })

  const [selectedTypeId, setSelectedTypeId] = useState<number | undefined>(undefined)
  const [name, setName] = useState<string | undefined>(undefined)

  const types: CategoryType[] = ['ACCOUNT', 'TRANSACTION', 'GOAL']
  const typeOptions = [
    {
      id: 0,
      name: 'Konta'
    },
    {
      id: 1,
      name: 'Transakcje'
    },
    {
      id: 2,
      name: 'Cele'
    }
  ]

  const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let id = e.target.value
    setSelectedTypeId(+id)
  }

  const [createCategory] = useCreateCategoryMutation()

  const handleAdd = () => {
    console.log(currentUser, name, selectedTypeId)
    if (currentUser && name && selectedTypeId !== undefined) {
      let type = types[selectedTypeId]
      let newCategory: Partial<CategoryDTO> = {
        user: currentUser?.id,
        categoryType: type,
        name: name
      }

      createCategory(newCategory)
      setName('')
      setSelectedTypeId(0)
    }
  }

  const [selectedType, setSelectedType] = useState<CategoryType | 'ALL'>('ACCOUNT')
  const [visibleCategories, setVisibleCategories] = useState<CategoryDTO[]>([])

  useEffect(() => {
    if (categories) {
      if (selectedType === 'ALL') {
        setVisibleCategories(categories)
        return
      }
      let filteredCategories = categories.filter((c) => c.categoryType === selectedType)
      setVisibleCategories(filteredCategories)
    }
  }, [categories, selectedType])

  return (
    <>
      {open && (
        <Modal handleClose={handleClose} width="w-fit">
          <ModalHeader handleClose={handleClose} title={'Kategorie'} />

          <div className="flex flex-col max-h-[500px] overflow-y-auto gap-6 pr-4 pb-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-background-800">Rodzaj kategorii</h3>
              <div className="flex flex-row w-full gap-8">
                <Radio
                  checked={selectedType === 'ACCOUNT'}
                  value={'ACCOUNT'}
                  name={'category_type'}
                  label={'Konta'}
                  id={'account-category-type-radio'}
                  handleChange={(e) => setSelectedType(e.target.value as CategoryType)}
                />
                <Radio
                  value={'TRANSACTION'}
                  name={'category_type'}
                  label={'Transakcje'}
                  id={'transaction-category-type-radio'}
                  handleChange={(e) => setSelectedType(e.target.value as CategoryType)}
                />
                <Radio
                  value={'GOAL'}
                  name={'category_type'}
                  label={'Cele'}
                  id={'transaction-category-type-radio'}
                  handleChange={(e) => setSelectedType(e.target.value as CategoryType)}
                />
                <Radio
                  value={'ALL'}
                  name={'category_type'}
                  label={'Wszystkie'}
                  id={'all-category-type-radio'}
                  handleChange={() => setSelectedType('ALL')}
                />
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-sm font-bold text-background-800">Lista kategorii</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 w-full text-xs">
                    <TableHeadCell label={'#'} align="left" />
                    <TableHeadCell label={'Nazwa'} align="left" />
                    <TableHeadCell label={'Typ'} />
                    <TableHeadCell label={'Akcja'} />
                  </tr>
                </thead>

                <tbody>
                  {visibleCategories.map((c, i) => (
                    <CategoriesTableRow category={c} index={i} />
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-sm font-bold text-background-800">Nowa kategorii</h3>
              <div className="flex flex-col gap-2 pt-2">
                <Input
                  value={name}
                  type={'text'}
                  placeholder={'Podaj nazwę kategorii ...'}
                  handleChange={(e) => setName(e.target.value)}
                />
                <Select
                  options={typeOptions}
                  placeholder={'Wybierz typ kategorii ...'}
                  handleSelect={handleTypeSelect}
                  value={selectedTypeId}
                />
                <div className="flex flex-row justify-center items-center w-full pt-2">
                  <Button
                    text="Dodaj kategorię"
                    onClick={handleAdd}
                    IconLeft={Plus}
                    color="primary"
                    variant="filled"
                    size="small"
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default ManageCategoriesModal
