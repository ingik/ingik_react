import { Box, Button, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { chatList } from '../../../_actions/chat_action'
// import {FixedSizeList} from 'react-window'

function ChatList(props) {

    const dispatch = useDispatch()
    const [Data,setData] = useState([])
    
    console.log('(ChatList)props : '+JSON.stringify(props.location.user))


    useEffect(() => {
        dispatch(chatList()).then( response => {
            if(response.payload){
                setData(response.payload)
            } else {
                alert("Failed to chatList")
            }
        })
    }, [dispatch])

    function List(){ 
        Data.map((data) =>{

        const url = data.roomName

        
        console.log(props.location.user)
        const onRoad = () => props.history.push({
            pathname : '/chat/',
            search : '?roomName='+url,
            user : props.location.user,
        })

        return (
          <ListItem key={data._id}>
            <ListItemButton onClick={ onRoad }>
              <ListItemText primary={ data.roomName }/>
            </ListItemButton>
          </ListItem>
          );
        })
    }

    const  onClickHandler = () => {
        props.history.push('./create')
    }



    return (
      <div>
        <div>
          <Button
            variant="contained"
            onClick={onClickHandler}
            sx={{ marginTop: "10px" }}
          >

            Room Create
          </Button>
        </div>
        <div
          sx={{
            width: "100%",
            height: 400,
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {/* <FixedSizeList
            height={400}
            width={360}
            itemSize={46}
            itemCount={200}
            overscanCount={5}
          > */}
            { List() }
          {/* </FixedSizeList> */}
        </div>
      </div>
    );
}

export default withRouter(ChatList)
