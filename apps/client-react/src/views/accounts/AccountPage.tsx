import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPageHeaderState, setPageName } from '../../redux/slices/pageHeaderSlice'
import { useNavigate, useParams } from 'react-router-dom'
import ContentContainer from '../../components/containers/ContentContainer'
import { useGetAccountQuery } from '../../redux/api/slices/accountSlice'
import { RootState } from '../../redux/store'
import { useGetUsersCategoriesQuery } from '../../redux/api/slices/categorySlice'
import TextWithDescription from '../../components/text/TextWithDescription'
import { CategoryDTO, TransactionDTO } from 'shared-types'
import SelectGraph from '../../components/inputs/SelectGraph'
import SelectDate from '../../components/inputs/SelectDate'
import Checkbox from '../../components/inputs/Checkbox'
import Button from '../../components/buttons/Button'
import Searchbar from '../../components/inputs/Searchbar'
import { handleValueChange } from '../../utils'
import { ArrowLeft, Filter, Plus } from '../../components/icons'
import TableHeadCell from '../../components/table/TableHeadCell'
import { useGetUsersTransactionsQuery } from '../../redux/api/slices/transactionSlice'
import ManageTransactionModal from '../../components/modal/ManageTransactionModal'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTooltip,
  CategoryScale,
  LinearScale,
  Legend,
  BarElement
} from 'chart.js'
import EditAccountButton from '../../components/page-header/buttons/EditAccountButton'
import DeleteAccountButton from '../../components/page-header/buttons/DeleteAccountButton'
import DonutChart from '../../components/graph/DonutChart'
import Radio from '../../components/inputs/Radio'
import Tooltip from '../../components/tooltip/Tooltip'
import { BarChart } from '../../components/graph/BarChart'
import dayjs from 'dayjs'
import TransactionsTableRow from '../../components/table/TransactionsTableRow'
import FilterTransactionsMenu from '../../components/menu/FilterTransactionsMenu'
import { formatCurrency } from 'shared-utils/utils/formatCurrency'

const AccountPage = () => {
  ChartJS.register(ArcElement, ChartTooltip, Legend, CategoryScale, LinearScale, BarElement)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)
  const [accountCategory, setAccountCategory] = useState<CategoryDTO | null>(null)
  const [transactionCategories, setTransactionCategories] = useState<CategoryDTO[]>([])

  // ACCOUNT
  const { data: account, isSuccess: isAccountSuccess } = useGetAccountQuery({
    id: id
  })

  // CATEGORIES
  const { data: categories, isSuccess: isCategoriesSuccess } = useGetUsersCategoriesQuery({
    id: currentUser?.id
  })

  // TRANSACTIONS
  const { data: transactions } = useGetUsersTransactionsQuery({
    id: currentUser?.id
  })

  const [accountTransactions, setAccountTransactions] = useState<TransactionDTO[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<TransactionDTO[]>([])
  const [visibleTransactions, setVisibleTransactions] = useState<TransactionDTO[]>([])

  const [incomesSum, setIncomesSum] = useState(
    accountTransactions.filter((t) => !t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
  )
  const [expensesSum, setExpensesSum] = useState(
    accountTransactions.filter((t) => t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
  )

  useEffect(() => {
    if (transactions) {
      let accountTransactions = transactions?.filter((t) => t.accountId === id)
      let ids = accountTransactions.map((t) => t.categoryId)
      let filteredCategories = categories?.filter((c) => ids.includes(c.id))
      setTransactionCategories(filteredCategories || [])
      setAccountTransactions(accountTransactions)
      setVisibleTransactions(accountTransactions)
      setIncomesSum(
        accountTransactions.filter((t) => !t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
      )
      setExpensesSum(
        accountTransactions.filter((t) => t.isExpense).reduce((prev, curr) => prev + curr.value, 0)
      )
    }
  }, [transactions])

  useEffect(() => {
    dispatch(
      setPageHeaderState({
        pageName: 'Szczegóły konta',
        isMonthPickerVisible: false,
        isSideButtonVisible: true,
        buttonType: 'EDIT_ACCOUNT'
      })
    )
  }, [])

  useEffect(() => {
    if (account && categories) {
      dispatch(setPageName(account.name))
      let category = categories.find((c) => c.id === account.category)
      if (category) setAccountCategory(category)
    }
  }, [account, isAccountSuccess, isCategoriesSuccess])

  // SELECTED GRAPH TYPE STATE
  const [selectedGraphType, setSelectedGraphType] = useState(0)

  // SELECTED DATE STATE
  const [startDate, setStartDate] = useState<string>(dayjs().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState<string>(dayjs().add(6, 'month').format('YYYY-MM-DD'))

  // SEARCHBAR STATE
  const [search, setSearch] = useState<string | undefined>(undefined)

  // TRANSACTION MODAL STATE
  const [transactionModalOpen, setTransactionModalOpen] = useState(false)

  // GRAPH SETTINGS
  const [transactionsType, setTransactionsType] = useState<'incomes' | 'expenses' | 'both'>(
    'incomes'
  )
  const [dataType, setDataType] = useState<'sum' | 'count'>('sum')

  const handleTransactionTypeSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (value === 'incomes' || value === 'expenses' || value === 'both') setTransactionsType(value)
  }

  const handleDataTypeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    if (value === 'sum' || value === 'count') setDataType(value)
  }

  useEffect(() => {
    console.log(selectedGraphType)
  }, [selectedGraphType])

  // FILTERING MENU
  const [filterMenuOpen, setFilterMenuOpen] = useState(true)

  // SEARCHBAR

  function searchTransactions(
    transactions: TransactionDTO[],
    searchString: string
  ): TransactionDTO[] {
    const searchTerm = searchString.trim().toLowerCase()

    return transactions.filter((transaction) => {
      const { title, recipient } = transaction

      const titleMatch = title.toLowerCase().includes(searchTerm)
      const recipientMatch = recipient.toLowerCase().includes(searchTerm)

      return titleMatch || recipientMatch
    })
  }

  useEffect(() => {
    if (search) {
      setVisibleTransactions(searchTransactions(filteredTransactions, search))
    } else {
      setVisibleTransactions(filteredTransactions)
    }
  }, [search, filteredTransactions])

  return (
    <div>
      {isAccountSuccess && isCategoriesSuccess && (
        <div className="flex flex-col justify-start gap-6">
          <div className="flex flex-row justify-between items-end w-full pt-6">
            <div className="flex flex-row gap-4 items-center">
              <Tooltip text="Powrót" side="bottom">
                <Button
                  // variant="icon-only"
                  color="neutral"
                  fullWidth={false}
                  text="Powrót"
                  IconLeft={ArrowLeft}
                  size="small"
                  onClick={() => navigate('/accounts')}
                />
              </Tooltip>
              <h1 className="text-lg text-background-800 font-semibold">{account?.name}</h1>
            </div>

            <div className="flex flex-row gap-4">
              <DeleteAccountButton />
              <EditAccountButton />
            </div>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <div className="flex flex-col w-1/2 gap-3">
              <h2 className="text-md font-semibold text-background-700">Informacje ogólne</h2>
              <div className="flex flex-col gap-4 pl-4">
                <TextWithDescription text="Nazwa" description={account.name} />
                <TextWithDescription text="Rodzaj konta" description={accountCategory?.name} />
                <TextWithDescription
                  text="Bilans"
                  description={formatCurrency(incomesSum - expensesSum)}
                />
              </div>
            </div>

            <div className="flex flex-col w-1/2">
              <h2 className="text-md font-semibold text-background-700">Podsumowanie liczbowe</h2>
              <DonutChart transactionType={transactionsType} dataType={dataType} half />
              <div className="w-full flex flex-row justify-center items-center gap-4">
                <div className="flex flex-col gap-1 w-48">
                  <span className="text-sm text-background-600">Dochody</span>
                  <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-[4px] bg-[#8dbe88]"></div>
                    <span className="text-xs font-bold text-background-600">
                      {formatCurrency(incomesSum)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 w-48">
                  <span className="text-sm text-background-600">Wydatki</span>
                  <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-[4px] bg-[#e68080]"></div>
                    <span className="text-xs font-bold text-background-600">
                      {formatCurrency(expensesSum)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full justify-between items-start">
            <div className="flex flex-col justify-between items-start w-1/2 gap-4">
              <h2 className="text-md font-semibold text-background-700">Podsumowanie liczbowe</h2>
              <div className="flex flex-col gap-2 pl-4">
                <h3 className="text-sm font-bold text-background-600">Rodzaj transakcji</h3>
                <div className="flex flex-row gap-6 pl-4">
                  <Radio
                    value={'incomes'}
                    name={'transactionType'}
                    label={'Dochody'}
                    id={'incomes-radio-button'}
                    handleChange={handleTransactionTypeSelected}
                    checked={transactionsType === 'incomes'}
                  />
                  <Radio
                    value={'expenses'}
                    name={'transactionType'}
                    label={'Wydatki'}
                    id={'expenses-radio-button'}
                    handleChange={handleTransactionTypeSelected}
                    checked={transactionsType === 'expenses'}
                  />
                  <Radio
                    value={'both'}
                    name={'transactionType'}
                    label={'Wszystkie transakcje'}
                    id={'both-radio-button'}
                    handleChange={handleTransactionTypeSelected}
                    checked={transactionsType === 'both'}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pl-4">
                <h3 className="text-sm font-bold text-background-600">Rodzaj danych</h3>
                <div className="flex flex-row gap-6 pl-4">
                  <Radio
                    value={'sum'}
                    name={'dataType'}
                    label={'Suma transakcji'}
                    id={'data-type-sum-radio-button'}
                    checked={dataType === 'sum'}
                    handleChange={handleDataTypeSelect}
                  />
                  <Radio
                    value={'count'}
                    name={'dataType'}
                    label={'Liczba transakcji'}
                    id={'data-type-count-radio-button'}
                    checked={dataType === 'count'}
                    handleChange={handleDataTypeSelect}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pl-4">
                <h3 className="text-sm font-bold text-background-600">Przedział czasowy</h3>
                <div className="flex flex-row justify-between items-center w-full gap-4 pl-4">
                  <SelectDate
                    value={startDate}
                    handleChange={(e) => handleValueChange(e, setStartDate)}
                    id="select-graph-start-date"
                  />
                  <SelectDate
                    value={endDate}
                    handleChange={(e) => handleValueChange(e, setEndDate)}
                    id="select-graph-end-date"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pl-4">
                <h3 className="text-sm font-bold text-background-600">Rodzaj wykresu</h3>
                <SelectGraph
                  value={selectedGraphType}
                  handleChange={(e) => handleValueChange(e, setSelectedGraphType)}
                  className="ml-4"
                />
              </div>
            </div>

            <div className="flex flex-col justify-between items-start w-1/2">
              <h2 className="text-md font-semibold text-background-700">Wykres</h2>
              <div className="w-[80%] flex flex-row justify-center">
                {selectedGraphType == 0 && (
                  <BarChart
                    transactionType={transactionsType}
                    dataType={dataType}
                    startDate={startDate}
                    endDate={endDate}
                  />
                )}

                {selectedGraphType == 1 && (
                  <DonutChart transactionType={transactionsType} dataType={dataType} />
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <h2 className="text-md font-semibold text-background-700">Lista transakcji</h2>
            <div className="flex flex-row gap-6">
              <FilterTransactionsMenu
                open={filterMenuOpen}
                transactions={accountTransactions}
                categories={transactionCategories}
                setVisibleTransactions={setFilteredTransactions}
              />
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row items-center w-full">
                  <div className="flex flex-row items-center w-full gap-6">
                    <div>
                      <Button
                        text="Filtruj"
                        IconLeft={Filter}
                        size="small"
                        iconClassName="text-md"
                        onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                      />
                    </div>
                    <div>
                      <Checkbox
                        label="Pokaż szczegółowe dane"
                        id="details-checkbox"
                        checked={false}
                        handleChange={() => {}}
                      />
                    </div>
                  </div>
                  <div className="w-52">
                    <Button
                      text="Dodaj transakcję"
                      onClick={() => setTransactionModalOpen(true)}
                      IconLeft={Plus}
                      size="small"
                      className="w-36"
                    />
                  </div>
                </div>
                <div>
                  <Searchbar value={search} handleChange={(e) => handleValueChange(e, setSearch)} />
                </div>
                <div className="h-[400px] overflow-y-auto">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 bg-background-50">
                      <tr className="border-b-2 border-background-200 text-sm font-light text-background-600">
                        <TableHeadCell label={'Status'} />
                        <TableHeadCell label={'Nazwa'} />
                        <TableHeadCell label={'Data'} align="left" />
                        <TableHeadCell label={'Odbiorca'} align="left" />
                        <TableHeadCell label={'Opis'} align="left" />
                        <TableHeadCell label={'Kategoria'} align="left" />
                        <TableHeadCell label={'Kwota'} align="left" />
                        <TableHeadCell label={'Akcja'} />
                      </tr>
                    </thead>

                    <tbody className="h-[200px] overflow-y-auto">
                      {visibleTransactions &&
                        visibleTransactions.map((t) => (
                          <TransactionsTableRow transaction={t} categories={categories} />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ManageTransactionModal
        id={id}
        open={transactionModalOpen}
        handleOpen={() => setTransactionModalOpen(true)}
        handleClose={() => setTransactionModalOpen(false)}
      />
    </div>
  )
}

export default AccountPage
