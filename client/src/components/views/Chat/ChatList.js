import { Box, Button, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useCallback, useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { chatList } from '../../../_actions/chat_action'
import ChatAddUser from './ChatAddUser'
// import {FixedSizeList} from 'react-window'

function ChatList(props) {

    const dispatch = useDispatch()
    const [Data,setData] = useState([])
    const [ModalOpen, setModalOpen] = useState(false)
    
    // console.log('(ChatList)props : '+JSON.stringify(props.location.user))


    useEffect(() => {
        dispatch(chatList()).then( response => {
            if(response.payload){
              console.log(response.payload)
                setData(response.payload)
            } else {
                alert("Failed to chatList")
            }
        })
    }, [])

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
              Data.map((data) =>{

                const url = data.roomName
                
                console.log(props.location.user)
                const onRoad = () => props.history.push({
                    pathname : '/chat/',
                    search : '?roomName='+url,
                    user : props.location.user,
                })
        
                return (
                  <ListItem key={ data._id } component = "div" disablePadding>
                    <ListItemButton onClick={ onRoad }>
                      <ListItemText primary={ data.roomName }/>
                    </ListItemButton>
                  </ListItem>
                  );
                })
            }
        </Box>
      </div>
    );
}

export default withRouter(ChatList)
