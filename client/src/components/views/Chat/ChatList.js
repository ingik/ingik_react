import { Avatar, Box, Button, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import axios from 'axios'
import React, { useCallback, useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { chatList } from '../../../_actions/chat_action'
import ChatAddUser from './ChatAddUser'
// import {FixedSizeList} from 'react-window'

function ChatList(props) {

    const userData = useSelector(state => state.user.userData)
    
    const [Data,setData] = useState([])
    const [ModalOpen, setModalOpen] = useState(false)
    
    
    
    useEffect(() => {
      console.log('useEffect')
      if(userData){
        console.log(userData)
        axios.get("/api/DirectMessage/List/" + userData?._id).then((response) => {


            response.data.map((list) => {
              let ListId;
              if(list.receiveUserId === userData._id){
                ListId = list.sendUserId
              }else{
                ListId = list.receiveUserId
              }

              console.log(ListId)
              axios.get('/api/users/findId/'+ListId).then(response => {
                if(response.data){
                  setData((prevState) => {return [...prevState, response.data]})
                }
              })
            })

            
        });
      }
        
    }, [userData])

    // modal

    const onModalOpen = () => {
      setModalOpen(true)
    }

    const onModalClose = (data) => {
      console.log('getFunc')
      setModalOpen(data)
    }

    return (
      <div style={{paddingTop:'64px'}}>

        <div>
          <Button
            variant="contained"
            // onClick={onClickHandler}
            onClick={ onModalOpen }
            sx={{ marginTop: "10px" }}
          >
            Room Create
          </Button>
        </div>

        <ChatAddUser Open={ ModalOpen } onModalClose={ onModalClose }/>
        <Box
          sx={{
            width: "100%",
            height: 400,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
            {
              Data && Data.map((data) =>{
                // console.log(data)
                return (
                  <ListItem key={ data._id } component = "div" disablePadding>
                    <ListItemButton >
                    <Avatar
            alt={data.name}
            src={data.image}
            style={{
              display: "inline-block",
              verticalAlign: "top",
              width: "32px",
              height: "32px",
            }}
          />
            <Typography variant="body1" style={{ display: "inline-block",marginLeft:'5px' }}>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "300",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              >
                {data.name}
              </span>
            </Typography>
                    </ListItemButton>
                  </ListItem>
                  );
                })
            }
        </Box>
      </div>
    );
}

export default React.memo(withRouter(ChatList))
