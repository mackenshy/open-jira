import { createContext } from 'react'
import { Entry } from '../../interfaces'

export type ContextProps = {
  entries: Entry[],
  addEntry: (description: string) => void
}

export const EntriesContext = createContext({} as ContextProps)