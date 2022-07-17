import { FC, useReducer } from 'react'
import { v4 as uuidv4} from 'uuid'
import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

export type EntriesState = {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [ 
    {
      _id: uuidv4(),
      description: 'Pendiente: Lorem ipsum',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'In Progress: Adava Kedabra',
      status: 'in-progress',
      createdAt: Date.now() - 10000
    },
    {
      _id: uuidv4(),
      description: 'In Progress: Alojomora',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description: 'Finished: Pepepepepepe',
      status: 'finished',
      createdAt: Date.now() - 100000
    }
  ]
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

return (
    <EntriesContext.Provider value={{
      ...state,
      addEntry
    }}>
      { children }
    </EntriesContext.Provider>
  )
}