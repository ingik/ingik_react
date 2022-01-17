import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';

export default function SideAppBar() {

  const [OnSideBar, setOnSideBar] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOnSideBar(open)
    
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Board" />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button>
            <ListItemIcon>
                <MailIcon/>
            </ListItemIcon>
            <ListItemText primary="Open Chat" />
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment>
          <Button onClick={toggleDrawer(true)}>SideBar</Button>
          <Drawer
            anchor="left"
            open={OnSideBar} //true false
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}