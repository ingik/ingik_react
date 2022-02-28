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
import { IconButton, Modal } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ImageBoardUpload from '../ImageBoard/ImageBoardUpload';


export default function SideAppBar(props) {

  const [OnSideBar, setOnSideBar] = useState(false)


   //modal
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

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
     props.propsData.history.push("/")
   };

   const onHome = () => {
    props.propsData.history.push("/imageBoardCmp")
   };

   const onImageUpload = () => {
     setOpen(true)
   };

   const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width:'90%',
    height:'500px',
    boxShadow: 24,
    p: 4,
    padding:'0'
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
          <ListItem button onClick={ onBoard }>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Board" />
          </ListItem>
          <ListItem button onClick={ onImageUpload }>
            <ListItemIcon>
              <InboxIcon/>
            </ListItemIcon>
            <ListItemText primary="Upload" />
          </ListItem>
      <Divider />
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ImageBoardUpload />
          </Box>
        </Modal>
      </React.Fragment>
    </div>
  );
}