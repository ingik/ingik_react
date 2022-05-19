import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import ForumIcon from "@mui/icons-material/Forum";
import { IconButton, Modal } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ImageBoardUpload from "../ImageBoard/ImageBoardUpload";
import NotificationsIcon from "@mui/icons-material/Notifications";
import UploadIcon from "@mui/icons-material/Upload";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import useMediaQuery from "@mui/material/useMediaQuery";

export default function SideAppBar(props) {
  const [OnSideBar, setOnSideBar] = useState(false);

  //mediaQiery
  const mediaQuery = useMediaQuery("(min-width:641px)");

  //modal
  const [open, setOpen] = React.useState(false);
  //  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOnSideBar(open);
  };
  
  const onOpenChat = () => {
    props.propsData.history.push("/chat/list");
  };

  const onBoard = () => {
    props.propsData.history.push("/");
  };

  const onHome = () => {
    props.propsData.history.push("/imageBoardCmp");
  };

  const onImageUpload = () => {
    setOpen(true);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: "84vw",
    height: "66vh",
    boxShadow: 24,
    p: 4,
    padding: "0",
  };

  const mobileStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: "90vw",
    height: "82vh",
    boxShadow: 24,
    p: 4,
    padding: "0",
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={onHome}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={onBoard}>
          <ListItemIcon>
            <FormatListBulletedIcon />
          </ListItemIcon>
          <ListItemText primary="Board" />
        </ListItem>
        <ListItem button onClick={onImageUpload}>
          <ListItemIcon>
            <UploadIcon />
          </ListItemIcon>
          <ListItemText primary="Upload" />
        </ListItem>
        <Divider />
        <ListItem button onClick={onOpenChat}>
          <ListItemIcon>
            <ForumIcon />
          </ListItemIcon>
          <ListItemText primary="Message" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notice" />
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
          <Box sx={mediaQuery ? style : mobileStyle}>
            <ImageBoardUpload handleClose={handleClose} />
          </Box>
        </Modal>
      </React.Fragment>
    </div>
  );
}
