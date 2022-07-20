import { FC, useEffect, useReducer } from 'react'
import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'
import entriesApi from '../../api/entriesApi';

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

  const addEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>('/entries', { description })
  
      dispatch({ type: '[Entries] - Add Entry', payload: data})
    } catch (error) {
      console.log(error)
    }
  }

  const updateEntry = async ({_id, description, status}: Entry) => {
    try {
      const { data  } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: '[Entries] - Update Entry', payload: data})
    } catch(error) {
      console.log(error)
    } 
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entries] - Refresh Entries', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

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