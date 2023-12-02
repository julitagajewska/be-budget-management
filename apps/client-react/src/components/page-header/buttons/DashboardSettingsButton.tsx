import { useState } from 'react'
import Tooltip from '../../tooltip/Tooltip'
import Button from '../../buttons/Button'
import { Apps } from '../../icons'
import Modal from '../../modal/Modal'

const DashboardSettingsButton = () => {
  const [isDashboardSettingsMenuOpen, setIsDashboardSettingsMenuOpen] = useState(false)

  const handleOpen = () => {
    setIsDashboardSettingsMenuOpen(true)
  }

  const handleClose = () => {
    setIsDashboardSettingsMenuOpen(false)
  }

  return (
    <div>
      <Tooltip text="Ustawienia dashboardu">
        <Button
          variant="icon-only"
          color="transparent"
          size="small"
          IconLeft={Apps}
          onClick={handleOpen}
        />
      </Tooltip>

      {isDashboardSettingsMenuOpen && (
        <Modal handleClose={handleClose}>
          <div>Ustawienia dashboard'u</div>
        </Modal>
      )}
    </div>
  )
}

export default DashboardSettingsButton
