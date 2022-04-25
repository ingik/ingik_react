// import Search from "@mui/icons-material/Search";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal, Radio, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useSelector } from "react-redux";
import './Chat.css';


import useMediaQuery from '@mui/material/useMediaQuery';



const Modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  minWidth:'316px',
  height:"500px",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      // marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  
  

function ChatAddUser(props) {

  const mediaQuery = useMediaQuery('(min-width:600px)');

  console.log(props)
  const userData = useSelector(state => state.user.userData)

    // search radio
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
      console.log(event.currentTarget.children[2].children[0].value)
    setSelectedValue(event.currentTarget.children[2].children[0].value);
  };



    //search
  const [anchorEl, setAnchorEl] = useState(null);
  const [OnOff, setOnOff] = useState(false)


  const [SearchValue, setSearchValue] = useState("");
  const [UserList, setUserList] = useState([]);

  const searchHandleClose = () => {
    setAnchorEl(null);
    setSearchValue("")
    setUserList([])
  };


  const onSearchHanler = (event) => {
    event.preventDefault()

    setSearchValue(event.currentTarget.value)
    console.log(event.currentTarget.value)

    let body = {
      name : event.currentTarget.value 
    }

    
    
    if(event.currentTarget.value !== ""){
      axios.post('/api/users/list',body).then(response => {
        console.log(response.data)
        setUserList(response.data)
      })
      setAnchorEl(event.currentTarget)
    } else {
      searchHandleClose()
    }
    
    setUserList([])
  }


    //modal
  const [open, setOpen] = useState(false);
  const handleClose = () => {
      setOpen(false)
      props.onModalClose(false)
    };

  
  useEffect(()=>{
    setOpen(props.Open)

    //clean up 
    return () => {
        // props.getFunc(false)
    }
  },[props.Open])



  //chatList
  const onChatListHandler = (event) => {
    
    event.preventDefault()

    let body = {
      sendUserId:userData._id,
      receiveUserId:selectedValue,
    }

    console.log(body)

    axios.post("/api/DirectMessage/Create",body).then(response =>{
      console.log(response.data)
      setOpen(false)
      props.onModalClose(false)
      props.childFunc(selectedValue)
    })

    
  }

 


  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Modalstyle}>
        <Search 
          sx={{margin:0}}
        >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={SearchValue}
              onChange={onSearchHanler}
            />

            <List
              style={{
                position: "absolute",
                zIndex: "99",
                backgroundColor: "white",
                maxHeight: "25em",
                overflowY: "auto",
                width: "100%",
                paddingBottom: 0,
                borderRadius: "5px",
              }}
              anchorEl={anchorEl}
              open={OnOff}
              onClose={handleClose}
            >
              {UserList.map((item) => {
                return (
                  <ListItemButton
                    key={item.name}
                    style={{ width: "100%" }}
                    onClick={handleChange}
                    >
                    <ListItemAvatar>
                      <Avatar alt={item.name} src={item.image} />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} />
                    <Radio
                      value={item._id}
                      checked={selectedValue === item._id}
                      name={item.name}
                    />
                  </ListItemButton>
                );
              })}
            </List>
            <Button
              onClick={ onChatListHandler }
              disabled={!selectedValue ? true : false}
            >보내기</Button>
          </Search>

        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default React.memo(ChatAddUser);
