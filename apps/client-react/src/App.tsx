import Routing from './routing/Routing'
import dayjs from 'dayjs'
import 'dayjs/locale/pl'
import { DarkModeContextProvider } from './context/DarkModeContext'

const App = () => {
  dayjs.locale('pl')
  return (
    <DarkModeContextProvider>
      <Routing />
    </DarkModeContextProvider>
  )
}

export default App
