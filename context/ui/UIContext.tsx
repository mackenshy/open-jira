import { createContext } from 'react'

export type ContextProps = {
  sidemenuOpen: boolean,
  isAddingEntry: boolean,
  openSideMenu: () => void,
  closeSideMenu: () => void,
  setIsAddingEntry: (value: boolean) => void
}

export const UIContext = createContext({} as ContextProps)