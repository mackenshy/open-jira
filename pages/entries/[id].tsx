import { ChangeEvent, useMemo, useState, FC, useContext } from 'react'
import { GetServerSideProps } from 'next'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material"
import { Layout } from "../../components/layouts"
import { Entry, EntryStatus } from '../../interfaces/entry';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { getFormatDistanceToNow } from '../../lib';
import { useRouter } from 'next/router';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

type Props = {
  entry: Entry
}

const EntryPage:FC<Props> = ({ entry })=> {
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const { updateEntry, deleteEntry } = useContext(EntriesContext)

  const router = useRouter()

  const isNotValid = useMemo(() => (
    inputValue.length <= 0 && touched
  ), [inputValue, touched])

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onStatusChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status
    }

    updateEntry(updatedEntry, true)
  }

  const onDelete = () => {
    deleteEntry(entry)
    router.push('/')
  }

  return (
   <Layout title={`${inputValue.substring(0,20)}...`}>
    <Grid
      container
      justifyContent='center'
      sx={{ margintTop:  2 }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardHeader 
            title={'Entry:'}
            subheader={`Creada ${getFormatDistanceToNow(entry.createdAt)}`}
          />
          <CardContent>
            <TextField 
              sx={{ marginTop: 2, marginBottom: 1 }}
              fullWidth
              placeholder="New entry"
              autoFocus
              multiline
              label="New entry"
              value={inputValue}
              onChange={onTextFieldChanges}
              onBlur={() => setTouched(true)}
              helperText={isNotValid && 'Input a value'}
              error={isNotValid}
            />

            <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={onStatusChanges}
                >
                  {validStatus.map(option => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
            </FormControl>
          </CardContent>
          <CardActions>
            <Button
              startIcon={<SaveOutlinedIcon />}
              variant="contained"
              fullWidth
              onClick={onSave}
              disabled={inputValue.length <= 0}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>

    <IconButton 
      sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'error.dark'
      }}
      onClick={onDelete}
    >
      <DeleteOutlinedIcon />
    </IconButton>
   </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string}
  const entry = await dbEntries.getEntryById(id)
  
  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage