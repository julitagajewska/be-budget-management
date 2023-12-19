import { Search } from '../icons'
import { InputBase } from 'shared-types'
import Input from './Input'

const Searchbar = ({ value, handleChange }: InputBase) => {
  return (
    <Input
      value={value}
      type={'text'}
      placeholder={'Wyszukaj ...'}
      handleChange={handleChange}
      variant="small"
      Icon={Search}
    />
  )
}

export default Searchbar
