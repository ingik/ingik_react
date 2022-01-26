import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Avatar, Fab, TextField } from '@mui/material';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';

export default function ProfileUpdate(props) {

  const [OnSideBar, setOnSideBar] = useState(false)


  const [Name, setName] = useState("")
  const [Email, setEmail] = useState("")
  const [Intro, setIntro] = useState("")
  const [Image, setImage] = useState("")
  const [UpdateImage, setUpdateImage] = useState("")
  const [ProfileImage, setProfileImage] = useState({})

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
    if(props.user?.intro) setIntro(props.user?.intro)
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
    
    setProfileImage(ImageData)
    console.log('e.target.files : '+ProfileImage)

    


    if (event.target.files.length) {
      const reader = new FileReader();
      reader.readAsDataURL(ImageData);
      reader.onload = function (event) {
        
        setImage(event.target.result);

      };
    }
  }

  const onProfileImageRemover = ()  => {
    setImage("")
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    axios.post("/api/users/profileUpdate").then((response) => response.data);

    const Data = new FormData();
    Data.append("stringData", Name)
    Data.append("imageData", ProfileImage);
    console.log("Data : " + Data.has("stringData"));

    console.log("(ProfileUpdate)Data : " + Data.get("stringData"));

    axios
      .post("/api/users/imageUpdate", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data === "update error") alert("update error");

        setUpdateImage(response.data);
      });

    let body = {
      name: Name,
      email: Email,
      intro: Intro,
      updateImage: UpdateImage,
    };

    // axios.post("/api/users/profileUpdate", body).then();
  };



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
                variant="outlined"
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
                variant="outlined"
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
                variant="outlined"
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
          <Button onClick={toggleDrawer(false)}>cancel</Button>
          <Button onClick={toggleDrawer(false),onSubmitHandler}>update</Button>
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