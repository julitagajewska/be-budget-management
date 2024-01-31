import { Plus, SettingsAdjust } from '../icons'
import SidebarContainer from './SidebarContainer'

const OverviewSidebar = () => {
  return (
    <SidebarContainer side="right">
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-3 items-center hover:bg-background-100 hover:cursor-pointer transition-all ease-in-out duration-300 rounded-lg px-2 py-2">
          <div className="bg-background-300 w-8 h-8 rounded-full"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-background-700">Jan Kowalski</span>
            <span className="text-xs text-bakcground-600">2 500 000.00 $</span>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <span className="text-sm">Twoje konta</span>
          <button className="bg-neutral-200 p-[2px] hover:bg-neutral-300 transition-all ease-in-out duration-300 rounded-md">
            <Plus className="text-lg" />
          </button>
        </div>

        <div className="flex flex-row items-center bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 py-2 gap-3 rounded-lg">
          <div className="w-8 h-8 bg-background-300 rounded-md"></div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-background-600">Wspólne</span>
            <span className="text-xs text-background-500">250 000.00 $</span>
          </div>
        </div>

        <div className="flex flex-row items-center bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 py-2 gap-3 rounded-lg">
          <div className="w-8 h-8 bg-background-300 rounded-md"></div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-background-600">Wspólne</span>
            <span className="text-xs text-background-500">250 000.00 $</span>
          </div>
        </div>

        <div className="flex flex-row items-center bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 py-2 gap-3 rounded-lg">
          <div className="w-8 h-8 bg-background-300 rounded-md"></div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-background-600">Wspólne</span>
            <span className="text-xs text-background-500">250 000.00 $</span>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center">
          <span className="text-sm">Cele</span>
          <button className="bg-neutral-200 p-[2px] hover:bg-neutral-300 transition-all ease-in-out duration-300 rounded-md">
            <Plus className="text-lg" />
          </button>
        </div>

        <div className="flex flex-col bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 pt-2 pb-4 gap-2 rounded-lg">
          <div className="flex flex-row items-center gap-3">
            <div className="w-8 h-8 bg-background-300 rounded-md"></div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-background-600">Wspólne</span>
              <span className="text-xs text-background-500">250 000.00 $</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <span className="text-xs text-background-700">1 875.00 $</span>
              <span className="text-xs text-background-700">75%</span>
            </div>
            <div className="relative">
              <div className="w-full h-1 bg-neutral-300 rounded-full absolute"></div>
              <div className="w-3/4 h-1 bg-neutral-400 rounded-full absolute"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-neutral-100 hover:bg-neutral-200 transition-all ease-in-out duration-300 hover:cursor-pointer px-3 pt-2 pb-4 gap-2 rounded-lg">
          <div className="flex flex-row items-center gap-3">
            <div className="w-8 h-8 bg-background-300 rounded-md"></div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-background-600">Wspólne</span>
              <span className="text-xs text-background-500">250 000.00 $</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <span className="text-xs text-background-700">1 875.00 $</span>
              <span className="text-xs text-background-700">25%</span>
            </div>
            <div className="relative">
              <div className="w-full h-1 bg-neutral-300 rounded-full absolute"></div>
              <div className="w-1/4 h-1 bg-neutral-400 rounded-full absolute"></div>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full flex flex-row justify-center gap-2 items-center text-background-700 bg-background-100 py-1 rounded-lg hover:bg-background-200 transition-all ease-in-out duration-300 hover:text-background-900">
        <SettingsAdjust />
        <span className="text-sm">Konfiguruj panel</span>
      </button>
    </SidebarContainer>
  )
}

export default OverviewSidebar
