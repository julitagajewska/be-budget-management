import { useState } from 'react'
import Tooltip from '../../tooltip/Tooltip'
import Button from '../../buttons/Button'
import { Edit } from '../../icons'
import EditAccountModal from '../../modal/account/EditAccountModal'

const EditAccountButton = () => {
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
      <Tooltip text="Edycja konto">
        <Button
          variant="filled"
          color="primary"
          size="small"
          text="Edytuj konta"
          IconLeft={Edit}
          onClick={handleOpen}
        />
      </Tooltip>

      <EditAccountModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </div>
  )
}

export default EditAccountButton
