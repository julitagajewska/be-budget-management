import Modal from './Modal'
import {
  useCreateCategoryMutation,
  useGetUsersCategoriesQuery
} from '../../redux/api/slices/categorySlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Checkbox from '../inputs/Checkbox'
import React, { useEffect, useState } from 'react'
import { CategoryDTO, CategoryType } from 'shared-types'
import Button from '../buttons/Button'
import { ArrowLeft, Cross, Plus } from '../icons'
import Input from '../inputs/Input'
import Select from '../inputs/Select'

type ManageCategoriesModalProps = {
  open: boolean
  handleClose: () => void
}

const ManageCategoriesModal = ({ open, handleClose }: ManageCategoriesModalProps) => {
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError
  } = useGetUsersCategoriesQuery({
    id: currentUser?.id
  })

  const [selectedTypes, setSelectedTypes] = useState<CategoryType[]>([])

  const [accountsType, setAccountsType] = useState(false)
  const [transactionsType, setTransactionsType] = useState(false)
  const [goalsType, setGoalsType] = useState(false)

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, value: CategoryType) => {
    if (e.target.checked) {
      setSelectedTypes([...selectedTypes, value])
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== value))
    }
  }

  const translationMap = {
    ACCOUNT: 'Konta',
    TRANSACTION: 'Transakcje',
    GOAL: 'Cele'
  }

  const removeValue = (array: CategoryType[], value: CategoryType) =>
    array.filter((e) => e !== value)

  useEffect(() => {
    if (accountsType) {
      setSelectedTypes([...selectedTypes, 'ACCOUNT'])
    } else {
      setSelectedTypes(removeValue(selectedTypes, 'ACCOUNT'))
    }
  }, [accountsType])

  useEffect(() => {
    if (transactionsType) {
      setSelectedTypes([...selectedTypes, 'TRANSACTION'])
    } else {
      setSelectedTypes(removeValue(selectedTypes, 'TRANSACTION'))
    }
  }, [transactionsType])

  useEffect(() => {
    if (goalsType) {
      setSelectedTypes([...selectedTypes, 'GOAL'])
    } else {
      setSelectedTypes(removeValue(selectedTypes, 'GOAL'))
    }
  }, [goalsType])

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
      // setName('')
      // setSelectedTypeId(0)
    }
  }

  return (
    <>
      {open && (
        <Modal handleClose={handleClose}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-row justify-between items-center w-full">
              <h1 className="text-lg font-bold">Kategorie</h1>
              <Button
                variant="icon-only"
                color="neutral"
                size="small"
                IconLeft={Cross}
                onClick={handleClose}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-bold">Rodzaj kategorii</h2>
              <div className="flex flex-row gap-8">
                <Checkbox
                  label={'Konta'}
                  id={'accounts-category-checkbox'}
                  checked={accountsType}
                  handleChange={setAccountsType}
                />
                <Checkbox
                  label={'Transakcje'}
                  id={'accounts-category-checkbox'}
                  checked={transactionsType}
                  handleChange={setTransactionsType}
                />
                <Checkbox
                  label={'Cele'}
                  id={'accounts-category-checkbox'}
                  checked={goalsType}
                  handleChange={setGoalsType}
                />
              </div>
            </div>

            {selectedTypes.length !== 0 ? (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-bold">Lista kategorii</h2>
                <div>
                  {selectedTypes.map((t) => {
                    type ObjectKey = keyof typeof translationMap
                    const key = t as ObjectKey

                    return (
                      <div className="flex flex-col pb-2 text-sm">
                        <h3 className="text-sm font-semibold">{translationMap[key]}</h3>
                        <div className="flex flex-col pl-2">
                          {categories
                            ?.filter((c) => c.categoryType === t)
                            .map((c) => {
                              return <span>{c.name}</span>
                            })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-bold">Lista kategorii</h2>
                <span className="text-xs text-background-600">
                  Zaznacz rodzaj, aby podejrzeć przypisane do niego kategorie
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-sm font-bold">Nowa kategoria</h2>
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
            <div className="flex flex-row justify-center items-center w-full">
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
        </Modal>
      )}
    </>
  )
}

export default ManageCategoriesModal
