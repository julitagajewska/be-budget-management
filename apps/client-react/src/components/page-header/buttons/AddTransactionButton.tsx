import { useState } from 'react'
import Tooltip from '../../tooltip/Tooltip'
import Button from '../../buttons/Button'
import { Plus } from '../../icons'
import ManageTransactionModal from '../../modal/ManageTransactionModal'

const AddTransactionButton = () => {
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
      <Tooltip text="Dodaj transakcję">
        <Button
          variant="filled"
          color="primary"
          size="small"
          text="Nowa tranakcja"
          IconLeft={Plus}
          onClick={handleOpen}
        />
      </Tooltip>

      <ManageTransactionModal open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </div>
  )
}

export default AddTransactionButton
