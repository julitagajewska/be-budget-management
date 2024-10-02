import { useState } from 'react'
import Tooltip from '../../tooltip/Tooltip'
import Button from '../../buttons/Button'
import { Plus } from '../../icons'
import ManageAccountModal from '../../modal/account/ManageAccountModal'

const AddAccountButton = () => {
  // MODAL STATE
  const [open, setOpen] = useState(false)

  // MODAL HANDLERS
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <button
        className="text-md h-6 rounded-md gap-2 button-small text-text-50 bg-primary-600 mt-4"
        onClick={handleOpen}
      >
        <Plus />
      </button>
      {/*       
      <Tooltip text="Utwórz nowe konto">
        <Button
          variant="filled"
          color="primary"
          size="small"
          text="Nowe konto"
          IconLeft={Plus}
          onClick={handleOpen}
        />
      </Tooltip> */}

      <ManageAccountModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </div>
  )
}

export default AddAccountButton
