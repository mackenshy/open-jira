import { createContext } from 'react'

export type ContextProps = {
  sidemenuOpen: boolean,
  openSideMenu: () => void,
  closeSideMenu: () => void
}

export const UIContext = createContext({} as ContextProps)