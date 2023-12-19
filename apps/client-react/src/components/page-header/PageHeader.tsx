import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import MonthPicker from '../month-picker/MonthPicker'
import { PageHeaderButtonType } from '../../redux/slices/pageHeaderSlice'
import DashboardSettingsButton from './buttons/DashboardSettingsButton'
import AddAccountButton from './buttons/AddAccountButton'
import AddTransactionButton from './buttons/AddTransactionButton'
import EditAccountButton from './buttons/EditAccountButton'

const PageHeader = () => {
  // Check if logged in
  const { pageName, isMonthPickerVisible, isSideButtonVisible, buttonType } = useSelector(
    (state: RootState) => state.pageHeader
  )

  const isLoggedIn = true

  const buttons: Record<PageHeaderButtonType, React.ReactNode> = {
    DASHBOARD_SETTINGS: <DashboardSettingsButton />,
    TRANSACTION: <AddTransactionButton />,
    INCOME: undefined,
    EXPENSE: undefined,
    GOAL: undefined,
    ACCOUNT: <AddAccountButton />,
    REPORTS: undefined,
    EDIT_ACCOUNT: <EditAccountButton />
  }

  if (isLoggedIn)
    return (
      <div className="h-10 w-full flex flex-row justify-between items-center">
        <div className="w-42">
          <h1 className="text-lg font-semibold">{pageName}</h1>
        </div>

        {isMonthPickerVisible && <MonthPicker />}

        <div className="w-36 flex flex-row justify-end">
          {isSideButtonVisible && buttonType !== undefined && buttons[buttonType]}
          {/* {isSideButtonVisible && (
            <Tooltip text="Ustawienia dashboardu">
              <Button variant="icon-only" color="transparent" size="small" IconLeft={Apps} />
            </Tooltip>
          )} */}
        </div>
      </div>
    )

  return (
    <div className="h-10 w-full flex flex-row justify-between items-center">
      <div>Logo</div>
      <div>Naviagtion</div>
      <div>Login and register</div>
    </div>
  )
}

export default PageHeader
