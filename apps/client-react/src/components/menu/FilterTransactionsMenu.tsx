import { CategoryDTO, TransactionDTO, TransactionStatus } from 'shared-types'
import Button from '../buttons/Button'
import { useEffect, useReducer } from 'react'
import Input from '../inputs/Input'
import Checkbox from '../inputs/Checkbox'
import SelectDate from '../inputs/SelectDate'

type FilterTransactionsMenuProps = {
  open: boolean
  transactions: TransactionDTO[]
  categories: CategoryDTO[]
  setVisibleTransactions: React.Dispatch<React.SetStateAction<TransactionDTO[]>>
}

type FilteringMenuState = {
  statuses: TransactionStatus[]
  dateFrom: string
  dateTo: string
  recipients: string[]
  categoryIds: string[]
  valueFrom: number
  valueTo: number
}

type ActionType =
  | { type: 'SET_STATUSES'; payload: TransactionStatus[] }
  | { type: 'ADD_STATUS'; payload: TransactionStatus }
  | { type: 'REMOVE_STATUS'; payload: TransactionStatus }
  | { type: 'SET_DATE_FROM'; payload: string }
  | { type: 'SET_DATE_TO'; payload: string }
  | { type: 'SET_RECIPIENTS'; payload: string[] }
  | { type: 'ADD_RECIPIENT'; payload: string }
  | { type: 'REMOVE_RECIPIENT'; payload: string }
  | { type: 'SET_CATEGORY_IDS'; payload: string[] }
  | { type: 'ADD_CATEGORY_ID'; payload: string }
  | { type: 'REMOVE_CATEGORY_ID'; payload: string }
  | { type: 'SET_VALUE_FROM'; payload: number }
  | { type: 'SET_VALUE_TO'; payload: number }

const reducer = (state: FilteringMenuState, action: ActionType): FilteringMenuState => {
  switch (action.type) {
    case 'SET_STATUSES': {
      return { ...state, statuses: action.payload }
    }
    case 'ADD_STATUS': {
      let statuses: TransactionStatus[] = [...state.statuses, action.payload]
      return { ...state, statuses: statuses }
    }
    case 'REMOVE_STATUS': {
      let statuses: TransactionStatus[] = state.statuses.filter((s) => s !== action.payload)
      return { ...state, statuses: statuses }
    }
    case 'SET_DATE_FROM': {
      return { ...state, dateFrom: action.payload }
    }
    case 'SET_DATE_TO': {
      return { ...state, dateTo: action.payload }
    }
    case 'SET_RECIPIENTS': {
      return { ...state, recipients: action.payload }
    }
    case 'ADD_RECIPIENT': {
      let recipients: string[] = [...state.recipients, action.payload]
      return { ...state, recipients: recipients }
    }
    case 'REMOVE_RECIPIENT': {
      let recipients: string[] = state.recipients.filter((r) => r !== action.payload)
      return { ...state, recipients: recipients }
    }
    case 'SET_CATEGORY_IDS': {
      return { ...state, categoryIds: action.payload }
    }
    case 'ADD_CATEGORY_ID': {
      let ids: string[] = [...state.categoryIds, action.payload]
      return { ...state, categoryIds: ids }
    }
    case 'REMOVE_CATEGORY_ID': {
      let ids: string[] = state.categoryIds.filter((id) => id !== action.payload)
      return { ...state, categoryIds: ids }
    }
    case 'SET_VALUE_FROM': {
      return { ...state, valueFrom: action.payload }
    }
    case 'SET_VALUE_TO': {
      return { ...state, valueTo: action.payload }
    }
    default:
      return state
  }
}

const initialState: FilteringMenuState = {
  statuses: [],
  dateFrom: '',
  dateTo: '',
  recipients: [],
  categoryIds: [],
  valueFrom: 0,
  valueTo: 0
}

const FilterTransactionsMenu = ({
  open,
  transactions,
  categories,
  setVisibleTransactions
}: FilterTransactionsMenuProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleAddStatus = (status: TransactionStatus) => {
    dispatch({ type: 'ADD_STATUS', payload: status })
  }

  const handleRemoveStatus = (status: TransactionStatus) => {
    dispatch({ type: 'REMOVE_STATUS', payload: status })
  }

  const handleDateFromChange = (newDateFrom: string) => {
    dispatch({ type: 'SET_DATE_FROM', payload: newDateFrom })
  }

  const handleDateToChange = (newDateTo: string) => {
    dispatch({ type: 'SET_DATE_TO', payload: newDateTo })
  }

  const handleAddRecipient = (recipient: string) => {
    dispatch({ type: 'ADD_RECIPIENT', payload: recipient })
  }

  const handleRemoveRecipient = (recipient: string) => {
    dispatch({ type: 'REMOVE_RECIPIENT', payload: recipient })
  }

  const handleAddCategoryId = (id: string) => {
    dispatch({ type: 'ADD_CATEGORY_ID', payload: id })
  }

  const handleRemoveCategoryId = (id: string) => {
    dispatch({ type: 'REMOVE_CATEGORY_ID', payload: id })
  }

  const handleValueFromChange = (newValueFrom: number) => {
    console.log(newValueFrom)
    dispatch({ type: 'SET_VALUE_FROM', payload: newValueFrom })
  }

  const handleValueToChange = (newValueTo: number) => {
    dispatch({ type: 'SET_VALUE_TO', payload: newValueTo })
  }

  const resetState = () => {
    dispatch({ type: 'SET_STATUSES', payload: [] })
    dispatch({ type: 'SET_DATE_FROM', payload: '' })
    dispatch({ type: 'SET_DATE_TO', payload: '' })
    dispatch({ type: 'SET_RECIPIENTS', payload: [] })
    dispatch({ type: 'SET_CATEGORY_IDS', payload: [] })
    dispatch({ type: 'SET_VALUE_FROM', payload: 0 })
    dispatch({ type: 'SET_VALUE_TO', payload: 0 })
  }

  function filterTransactions(
    transactions: TransactionDTO[],
    filters: FilteringMenuState
  ): TransactionDTO[] {
    return transactions.filter((transaction) => {
      const { status, date, recipient, categoryId, value } = transaction

      const { statuses, dateFrom, dateTo, recipients, categoryIds, valueFrom, valueTo } = filters

      // Check if transaction status is included in the filter
      if (statuses.length > 0 && !statuses.includes(status)) {
        return false
      }

      // Check if transaction date is within the specified range
      if ((date < dateFrom || date > dateTo) && (dateFrom !== '' || dateTo !== '')) {
        return false
      }

      // Check if transaction recipient is included in the filter
      if (recipients.length > 0 && !recipients.includes(recipient)) {
        return false
      }

      // Check if transaction categoryId is included in the filter
      if (categoryIds.length > 0 && !categoryIds.includes(categoryId)) {
        return false
      }

      // Check if transaction value is within the specified range
      if ((value < valueFrom || value > valueTo) && (valueFrom !== 0 || valueTo !== 0)) {
        return false
      }

      // All filters passed, include this transaction
      return true
    })
  }

  const handleApply = () => {
    let filteredTransactions = filterTransactions(transactions, state)
    setVisibleTransactions(filteredTransactions)
  }

  const handleReset = () => {
    resetState()
    setVisibleTransactions(transactions)
  }

  // INPUT HANDLERS
  const handleFinishedCheck = (value: boolean) =>
    value ? handleAddStatus('FINISHED') : handleRemoveStatus('FINISHED')

  const handlePendingCheck = (value: boolean) =>
    value ? handleAddStatus('PENDING') : handleRemoveStatus('PENDING')

  const handleRecipientCheck = (value: boolean, recipient: string) =>
    value ? handleAddRecipient(recipient) : handleRemoveRecipient(recipient)

  const handleCategoryCheck = (value: boolean, id: string) =>
    value ? handleAddCategoryId(id) : handleRemoveCategoryId(id)

  useEffect(() => {
    console.log(state)
  }, [state])

  const recipients: string[] = [...new Set(transactions.map((t) => t.recipient))]

  return (
    <div
      className={`${
        open ? 'w-72 visible' : 'w-[0px] hidden'
      } transition-all duration-300 ease-in-out overflow-hidden h-full bg-text-50 flex flex-col justify-between shadow-md rounded-md max-h-[500px] gap-4 py-6 pl-6 pr-3`}
    >
      <div className="flex flex-col gap-4 h-full overflow-auto">
        <h3 className="text-md font-semibold">Filtrowanie</h3>
        <div className="flex flex-col h-full gap-4 overflow-y-auto pr-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold">Status</h4>
            <div className="flex flex-col pl-2 gap-1">
              <Checkbox
                label={'Zakończona'}
                id={'is-finished-checkbox'}
                checked={state.statuses.includes('FINISHED')}
                handleChange={(value: boolean) => handleFinishedCheck(value)}
                size="small"
              />
              <Checkbox
                label={'Oczekująca'}
                id={'is-pending-checkbox'}
                checked={state.statuses.includes('PENDING')}
                handleChange={(value: boolean) => handlePendingCheck(value)}
                size="small"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold">Data</h4>
            <div className="flex flex-col pl-2 gap-1">
              <SelectDate
                label="Od"
                id="filtering-start-date-iput"
                value={state.dateFrom}
                handleChange={(e) => handleDateFromChange(e.target.value)}
              />
              <SelectDate
                label="Do"
                id="filtering-end-date-iput"
                value={state.dateTo}
                handleChange={(e) => handleDateToChange(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold">Odbiorca</h4>
            <div className="flex flex-col pl-2 gap-1">
              {recipients.map((r: string) => (
                <Checkbox
                  label={r}
                  id={`${r}-checkbox`}
                  checked={state.recipients.includes(r)}
                  handleChange={(value: boolean) => handleRecipientCheck(value, r)}
                  size="small"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold">Kategoria</h4>
            <div className="flex flex-col pl-2 gap-1">
              {categories.map((c) => (
                <Checkbox
                  label={c.name}
                  id={`${c.name}-checkbox`}
                  checked={state.categoryIds.includes(c.id)}
                  handleChange={(value: boolean) => handleCategoryCheck(value, c.id)}
                  size="small"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="text-xs font-bold">Kwota</h4>
            <div className="flex flex-row gap-4">
              <Input
                value={state.valueFrom}
                type={'number'}
                placeholder={'Od ...'}
                handleChange={(e) => handleValueFromChange(+e.target.value)}
              />
              <Input
                value={state.valueTo}
                type={'number'}
                placeholder={'Do ...'}
                handleChange={(e) => handleValueToChange(+e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-4">
        <Button
          variant="filled"
          color="neutral"
          text="Resetuj"
          size="small"
          onClick={handleReset}
        />
        <Button
          variant="filled"
          color="primary"
          text="Aplikuj"
          size="small"
          onClick={handleApply}
        />
      </div>
    </div>
  )
}

export default FilterTransactionsMenu
