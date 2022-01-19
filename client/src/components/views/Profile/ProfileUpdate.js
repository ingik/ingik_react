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
import { Avatar, Fab, TextField } from '@mui/material';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function ProfileUpdate(props) {

  const [OnSideBar, setOnSideBar] = useState(false)

  // console.log('(ProfileUpdate)props : '+ JSON.stringify(props))

  const [User,setUser] = useState({})

  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Intro, setIntro] = useState("")

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOnSideBar(open)
  };

  useEffect(() => {
    // setUser(props.user)
    setName(props.user?.name)
    setEmail(props.user?.email)
    setIntro(props.user?.intro)
  }, [props])


  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onIntroHandler = (event) => {
    setIntro(event.currentTarget.value)
  }

  const list = () => (
    <Box sx={{ height: "100vh",marginTop:'50px' }} role="presentation">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{position:'relative'}}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 150, height: 150, zIndex: "-1", position: "relative" }}
          >
          </Avatar>
          <Fab
              color="primary"
              aria-label="add"
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                zIndex: "10",
              }}
            >
              <AddIcon style={{ zIndex: "20"}} />
            </Fab>
          </div>
          <div>
            <form style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
            }}>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              style={{
                marginBottom: "10px",
                width: "250x",
                marginRight: "5px",
              }}
              type="text"
              value={Name}
              onChange={ onNameHandler }
              // placeholder={User?.name}
              focused 
            />
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              style={{
                marginBottom: "10px",
                width: "250x",
                marginRight: "5px",
              }}
              type="text"
              value={Email}
              onChange={ onEmailHandler }
              // placeholder={User?.email}
              focused 
            />
            <TextField
              label="Intro"
              variant="outlined"
              size="small"
              style={{
                marginBottom: "10px",
                width: "250x",
                marginRight: "5px",
              }}
              type="text"
              value={Intro}
              onChange={ onIntroHandler }
              // placeholder={User?.intro}
              focused 
            />
            </form>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={toggleDrawer(false)}>cancel</Button>
          <Button onClick={toggleDrawer(false)}>update</Button>
        </div>
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