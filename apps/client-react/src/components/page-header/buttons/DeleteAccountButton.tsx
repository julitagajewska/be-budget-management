import Button from '../../buttons/Button'
import Tooltip from '../../tooltip/Tooltip'
import { useState } from 'react'
import { Trash } from '../../icons'
import DeleteAccountModal from '../../modal/account/DeleteAccountModal'

const DeleteAccountButton = () => {
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
      <Tooltip text="Usuwanie konta">
        <Button
          variant="filled"
          color="neutral"
          size="small"
          text="Usuń konto"
          IconLeft={Trash}
          onClick={handleOpen}
        />
      </Tooltip>

      <DeleteAccountModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </div>
  )
}

export default DeleteAccountButton
