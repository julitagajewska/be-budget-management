import { component$ } from '@builder.io/qwik'
import { Link } from '@builder.io/qwik-city'
import type { AccountDTO } from 'shared-types'

type AccountTileProps = {
  account: AccountDTO
}

export default component$(({ account }: AccountTileProps) => {
  return (
    <Link
      href={`/accounts/${account._id}/`}
      class="flex flex-row justify-start items-center gap-4 bg-background-50 w-full pl-4 pr-12 py-3 rounded-md shadow-md hover:bg-primary-600 hover:bg-opacity-10 transition-all duration-150 ease-out hover:shadow-lg cursor-pointer"
    >
      {account.name}
    </Link>
  )
})
