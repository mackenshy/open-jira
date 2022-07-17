import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export type UIState = {
  sidemenuOpen: boolean,
  isAddingEntry: boolean,
  isEntryDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isEntryDragging: false
}

type Props = {
  children: React.ReactNode
}

export const UIProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const openSideMenu = () => dispatch({ type: '[UI] - Open Sidebar'})

  const closeSideMenu = () => dispatch({ type: '[UI] - Close Sidebar'})

  const setIsAddingEntry = ( isAddingEntry: boolean ) => dispatch({ type: '[UI] - Set is adding entry', payload: isAddingEntry })

  const startEntryDragging = () => dispatch({ type: '[UI] - Start entry dragging'})

  const endEntryDragging = () => dispatch({ type: '[UI] - End entry dragging'})
  
return (
    <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      startEntryDragging,
      endEntryDragging
    }}>
      { children }
    </UIContext.Provider>
  )
}