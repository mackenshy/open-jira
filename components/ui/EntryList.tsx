import { List, Paper } from "@mui/material"
import { DragEvent, FC, useContext, useMemo } from "react"
import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./EntryCard"
import styles from './EntryList.module.css'

type Props = {
  status: EntryStatus
}

export const EntryList:FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isEntryDragging, endEntryDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status == status), [entries])
  
  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
    const _id = event.dataTransfer.getData('_id')
    const entry = entries.find(entry => entry._id == _id)!
    entry.status = status
    updateEntry(entry)
    endEntryDragging()
  }

  return (
    <div 
      onDrop={onDropEntry} 
      onDragOver={allowDrop}
      className={isEntryDragging ? styles.dragging : ''}
    >
      <Paper sx={{ height: 'calc(100vh - 250px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px' }}>
        <List sx={{ opacity: isEntryDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard entry={entry} key={entry._id} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
