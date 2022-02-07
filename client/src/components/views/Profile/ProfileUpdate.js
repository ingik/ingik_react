import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { Avatar, Fab, TextField } from '@mui/material';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authUpdate } from '../../../_actions/user_action'

export default function ProfileUpdate(props) {

  const [OnSideBar, setOnSideBar] = useState(false)
  const dispatch = useDispatch()

  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Intro, setIntro] = useState("")
  const [Image, setImage] = useState("")
  const [ProfileImage, setProfileImage] = useState({})

  const [PreImage, setPreImage] = useState("")

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOnSideBar(open)
  };

  useEffect(() => {
    // console.log('(useEffect) : '+JSON.stringify(props.user))
    if(props.user){
      setName(props.user.name)
      setEmail(props.user.email)
      if(props.user.intro) setIntro(props.user?.intro)
      if(props.user.image) {
        setImage(props.user?.image)
        setPreImage(props.user?.image)
      }
    }
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

  const onProfileImageHandler = (event) => {
    event.preventDefault()

    // 이미지 파일 info

    const ImageData = event.target.files[0]
    console.log(ImageData);
    
    if (event.target.files[0]) {
      setProfileImage(ImageData)

      console.log('e.target.files : ' + ProfileImage)

      const reader = new FileReader();
      reader.readAsDataURL(ImageData);
      reader.onload = function (event) {
        
        setImage(event.target.result);

      };

    }
  }

  const onProfileImageRemover = ()  => {
    setImage("")
    setProfileImage("")
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();


    const Data = new FormData();
    Data.append("stringData", Name)
    Data.append("stringImage",PreImage)
    Data.append("imageData", ProfileImage);

    console.log("Data : " + Data.has("stringData"));
    console.log("(ProfileUpdate)Data : " + Data.get("stringData"));

    
    
    axios.post("/api/users/imageUpdate", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        
          console.log('response.data : '+response.data.location)

          let body = {
            name: Name,
            email: Email,
            intro: Intro,
            updateImage: response.data.location,
          };
        
          console.log("body : " + JSON.stringify(body));
          
          dispatch(authUpdate(body)).then( response => {
            if(response.payload){
              console.log("complete update")
            }
          })

            setOnSideBar(false);
      });

  };


  const onClose = () => {
    toggleDrawer(false)
    setOnSideBar(false)
    setImage(props.user.image)
  }



  const list = () => (
    <Box sx={{ height: "100vh", marginTop: "50px" }} role="presentation">
      <form onSubmit={ onSubmitHandler }>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div style={{ position: "relative" }}>
            <Avatar
              src={Image}
              sx={{
                width: 150,
                height: 150,
                zIndex: "-1",
                position: "relative",
              }}
            ></Avatar>

            <Fab
              color="primary"
              aria-label="remove"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: "10",
              }}
              size="small"
              disable="true"
              onClick={ onProfileImageRemover }
            >
              <CloseIcon style={{ zIndex: "20" }} />
            </Fab>

            <label htmlFor="input-file">
              <input
                type="file"
                id="input-file"
                accept="image/*"
                onChange={onProfileImageHandler}
                style={{ display: "none" }}
              ></input>
              <Fab
                component="span"
                color="primary"
                aria-label="add"
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  zIndex: "10",
                }}
                size="small"
              >
                <AddIcon style={{ zIndex: "20" }} />
              </Fab>
            </label>
          </div>

          <div style={{display:'flex' , flexDirection: 'column' , marginLeft:'30px'}}>
            
              <TextField
                label="Name"
                variant="standard"
                size="small"
                style={{
                  marginBottom: "10px",
                  width: "250x",
                  marginRight: "5px",
                }}
                type="text"
                value={Name}
                onChange={onNameHandler}
                // placeholder={User?.name}
                focused
              />
              <TextField
                label="Email"
                variant="standard"
                size="small"
                style={{
                  marginBottom: "10px",
                  width: "250x",
                  marginRight: "5px",
                }}
                type="text"
                value={Email}
                onChange={onEmailHandler}
                // placeholder={User?.email}
                focused
              />
              <TextField
                label="Intro"
                variant="standard"
                size="small"
                style={{
                  marginBottom: "10px",
                  width: "250x",
                  marginRight: "5px",
                }}
                type="text"
                value={Intro}
                onChange={onIntroHandler}
                // placeholder={User?.intro}
                focused
                multiline
              />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={ onClose }>cancel</Button>
          <Button onClick={onSubmitHandler}>update</Button>
        </div>
      </form>
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