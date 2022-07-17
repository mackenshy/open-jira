import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, TextField } from "@mui/material"
import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const { addEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = () => {
    if(inputValue.length === 0) return

    addEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
      {
        isAddingEntry ? (
          <>
            <TextField 
              autoFocus
              fullWidth
              multiline
              sx={{marginTop: 2, marginBottom: 1}} 
              placeholder="New entry"
              label="New Entry"
              helperText={inputValue.length <= 0 && touched && "Input a description"}
              error={inputValue.length <= 0 && touched}
              value={inputValue}
              onChange={onTextFieldChanges}
              onBlur={() => setTouched(true)}
            />
            <Box display="flex" justifyContent="space-between">
              <Button 
                variant="text"
                onClick={() => setIsAddingEntry(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="outlined"
                color="secondary"
                endIcon={<SaveOutlinedIcon />}
                onClick={onSave}
              >
                Save
              </Button>
            </Box>
          </>
        ) : 
        (
          <Button 
            startIcon={<AddCircleOutlineOutlinedIcon />}
            fullWidth
            variant="outlined"
            onClick={() => setIsAddingEntry(true)}
          >
            Add Entry
          </Button>
        )
      }
    </Box>
  )
}
