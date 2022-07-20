import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { DragEvent, FC, useContext } from "react"
import { UIContext } from "../../context/ui"
import { Entry } from "../../interfaces"
import { getFormatDistanceToNow } from "../../lib"

type Props = {
  entry: Entry
}

export const EntryCard:FC<Props> = ({ entry }) => {
  const { startEntryDragging, endEntryDragging } = useContext(UIContext)
  const router = useRouter()

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('_id', entry._id)
    startEntryDragging();
  }

  const onDragEnd = () => {
    endEntryDragging();
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card 
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line'}}>{entry.description}</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant="body2">{getFormatDistanceToNow(entry.createdAt)}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
