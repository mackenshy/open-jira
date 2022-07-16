import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Box } from "@mui/system"

const menuItems: string[] = ['Inbox','Starred','Send Email','Drafs']

export const Sidebar = () => {
  return (
    <Drawer
      anchor='left'
      open={true}
      onClose={() => console.log("Cerrando")}
    >
      <Box sx={{ widht: 250 }}>
        <Box sx={{ padding: '5px 10px'}}>
          <Typography variant='h4'>Menu</Typography>
        </Box>
        <List>
          {
            menuItems.map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />} 
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>
        <Divider />
        <List>
          {
            menuItems.map((text, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  { index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />} 
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Drawer>
  )
}
