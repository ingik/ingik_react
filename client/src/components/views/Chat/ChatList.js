import { Avatar, Box, Button, ListItem, ListItemButton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ChatAddUser from './ChatAddUser'
import DMList from './DMList'

import useMediaQuery from '@mui/material/useMediaQuery';

function ChatList(props) {

    const mediaQuery = useMediaQuery('(min-width:600px)');

    const userData = useSelector(state => state.user.userData)
    
    const [Data,setData] = useState([])
    const [ModalOpen, setModalOpen] = useState(false)
    const [SelectUser, setSelectUser] = useState(null)

    const [SelectUserId, setSelectUserId] = useState(null)
    
    
    
    useEffect(() => {
      console.log('useEffect')
      if(userData){

        console.log(userData)

        //UserList
        axios.get("/api/DirectMessage/List/" + userData?._id).then((response) => {

          setData([])
            response.data.map((list) => {
              let ListId;
              if (list.receiveUserId === userData._id) {
                ListId = list.sendUserId;
              } else {
                ListId = list.receiveUserId;
              }

              console.log(ListId);

              axios.get("/api/users/findId/" + ListId).then((response) => {
                  if(response.data){
                  setData((prevState) => {
                    return [...prevState, response.data]
                  })
                  // value.push(response.data)
                  }
                });
              // setData(value)

            });


          });
          // console.log(value)
          // setData(value)
      }
        
    }, [userData,SelectUser])

    // modal

    const onModalOpen = () => {
      setModalOpen(true)
    }

    const onModalClose = (data) => {
      console.log('getFunc')
      setModalOpen(data)
    }

    const childFunc = (data) =>{
      setSelectUser(data)
    }

    const SelectUserIdMemo = useMemo(()=> SelectUserId,[SelectUserId])



    return (
      <div style={{ paddingTop: "64px" }}>

        <div>
          <ChatAddUser
            Open={ModalOpen}
            onModalClose={onModalClose}
            childFunc={childFunc}
          />
        </div>

        <div style={{
          display:'flex',
          justifyContent:'center'
          
        }}>
        <Box
          sx={{
            width: '16rem',
            // height: 400,
            minWidth: 180,
            bgcolor: "background.paper",
          }}
        >
          <ListItem>
          <Button
            variant="contained"
            // onClick={onClickHandler}
            onClick={onModalOpen}
            sx={{ marginTop: "10px" }}
          >
            ADD USER
          </Button>
          </ListItem>
          {Data &&
            Data.map((data, index) => {
              return (
                <ListItem key={index} component="div" disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setSelectUserId(data?._id)
                    } }
                  >
                    <Avatar
                      alt={data?.name}
                      src={data?.image}
                      style={{
                        display: "inline-block",
                        verticalAlign: "top",
                        width: "32px",
                        height: "32px",
                      }}
                    />
                    <Typography
                      variant="body1"
                      style={{ display: "inline-block", marginLeft: "5px" }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "300",
                          display: "inline-block",
                          marginRight: "5px",
                        }}
                      >
                        {data?.name}
                      </span>
                    </Typography>
                  </ListItemButton>
                </ListItem>
              );
            })}
        </Box>

        {
            SelectUserIdMemo !== null
              ? <DMList OtherUserId={SelectUserIdMemo} />
              : <div style={{width: "70vh"}}></div>
          }
          </div>
      </div>
    );
}

export default React.memo(withRouter(ChatList))
