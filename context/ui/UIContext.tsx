import { createContext } from 'react'

export type ContextProps = {
  sidemenuOpen: boolean,
  isAddingEntry: boolean,
  isEntryDragging: boolean,
  openSideMenu: () => void,
  closeSideMenu: () => void,
  setIsAddingEntry: (value: boolean) => void,
  startEntryDragging: () => void,
  endEntryDragging: () => void
}

export const UIContext = createContext({} as ContextProps)