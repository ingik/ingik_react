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
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export default function SideAppBar(props) {

  const [OnSideBar, setOnSideBar] = useState(false)

  console.log('(SideAppBar)props : '+ JSON.stringify(props))

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOnSideBar(open)
    
   };
   const onOpenChat = () => {
     props.propsData.history.push("/chat/list");
   };

   const onBoard = () => {
     props.propsData.history.push("/boards")
   };

   const onHome = () => {
    props.propsData.history.push("/")
   };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem button onClick={ onHome }>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
      </List>
      <List>
          <ListItem button onClick={ onBoard }>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Board" />
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem button onClick={ onOpenChat }>
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
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
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