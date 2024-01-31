import { AccountDTO } from 'shared-types'
import { Bag } from '../icons'
import { useNavigate } from 'react-router-dom'

type AccountTileProps = {
  account: AccountDTO
}

const AccountTile = ({ account }: AccountTileProps) => {
  const navigate = useNavigate()

  console.log(account)

  return (
    <div
      className="group flex flex-row justify-start items-center gap-4 bg-background-50 w-full pl-4 pr-12 py-3 rounded-md shadow-md hover:bg-primary-700 hover:bg-opacity-[0.5] transition-all duration-150 ease-out hover:shadow-lg cursor-pointer"
      onClick={() => navigate(`/accounts/${account._id}`)}
    >
      <div className="bg-background-100 p-3 rounded-full group-hover:bg-background-50">
        <Bag className="text-xl" />
      </div>
      <div className="flex flex-col justify-start items-start">
        <span className="text-base font-medium">{account.name}</span>
        <span className="text-xs text-background-500 group-hover:text-background-100">
          {account.balance} zł
        </span>
      </div>
    </div>
  )
}

export default AccountTile
