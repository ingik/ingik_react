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
import { Avatar } from '@mui/material';

export default function ProfileUpdate() {

  const [OnSideBar, setOnSideBar] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOnSideBar(open)
    
  };

  const list = () => (
    <Box
      sx={{height:'100vh'}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
        <div>
        <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 150, height: 150 }}
          />
        </div>
      
    </Box>
  );

  return (
    <div>
        <React.Fragment>
          <Button variant='outlined' onClick={toggleDrawer(true)}>Profile Update</Button>
          <Drawer
            anchor="bottom"
            open={OnSideBar} //true false
            onClose={toggleDrawer(false)}
          >
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}