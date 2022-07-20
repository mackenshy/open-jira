import { FC, useReducer } from 'react'
import { v4 as uuidv4} from 'uuid'
import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

export type EntriesState = {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: []
}

type Props = {
  children: React.ReactNode
}

export const EntriesProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    }

    dispatch({ type: '[Entries] - Add Entry', payload: newEntry})
  }

  const updateEntry = (entry: Entry) => {
    dispatch({ type: '[Entries] - Update Entry', payload: entry})
  }

return (
    <EntriesContext.Provider value={{
      ...state,
      addEntry,
      updateEntry
    }}>
      { children }
    </EntriesContext.Provider>
  )
}