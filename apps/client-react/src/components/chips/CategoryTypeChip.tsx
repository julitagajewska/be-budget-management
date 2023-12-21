import Chip from './Chip'
import { CategoryDTO, CategoryType } from 'shared-types'

type CategoryTypeChipProps = {
  category: CategoryDTO
}

const colors: Record<CategoryType, string> = {
  ACCOUNT: 'bg-red-300',
  TRANSACTION: 'bg-green-300',
  GOAL: 'bg-sky-300'
}

const names: Record<CategoryType, string> = {
  ACCOUNT: 'Konta',
  TRANSACTION: 'Transakcje',
  GOAL: 'Cele'
}

const CategoryTypeChip = ({ category }: CategoryTypeChipProps) => {
  return <Chip text={names[category.categoryType]} color={colors[category.categoryType]} />
}

export default CategoryTypeChip
