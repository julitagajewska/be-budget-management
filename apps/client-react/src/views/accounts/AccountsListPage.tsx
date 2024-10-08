import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPageHeaderState } from '../../redux/slices/pageHeaderSlice'
import { RootState } from '../../redux/store'
import { useGetUsersAccountsQuery } from '../../redux/api/slices/accountSlice'
import AccountTile from '../../components/tile/AccountTile'
import AddAccountButton from '../../components/page-header/buttons/AddAccountButton'
import { ToastContainer } from 'react-toastify'

const AccountsListPage = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser)
  const { data } = useGetUsersAccountsQuery({
    id: currentUser?.id
  })

  useEffect(() => {
    dispatch(
      setPageHeaderState({
        pageName: 'Konta',
        isMonthPickerVisible: false,
        isSideButtonVisible: true,
        buttonType: 'ACCOUNT'
      })
    )
  }, [])

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-full">
        <h1>Twoje konta</h1>
        <AddAccountButton />
        {/* <ButtonClass
          text="Test button"
          icon={<Plus />}
          handleClick={() => alert('Button clicked!')}
        />
        <ButtonFunction
          text="Test button"
          icon={<Plus />}
          handleClick={() => alert('Button clicked!')}
        /> */}
      </div>
      <div className="grid grid-cols-3 gap-6 mt-4">
        {data?.map((a) => <AccountTile account={a} />)}
      </div>
      <ToastContainer />
    </div>
  )
}

export default AccountsListPage
