import { Avatar, Box, CircularProgress, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Modal } from '@mui/material'
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import FollowingCmp from '../../../moduls/FollowingCmp';
import { useHistory } from 'react-router-dom'


function FollowList(props) {

const [ListData, setListData] = useState(null)
const [open, setOpen] = useState(false);
const [loading, setloading] = useState(false)
const [CallData,setCallData] = useState(0)
const history = useHistory()

const userData = useSelector(state => state.user.userData )

const getFunc = (data) => {
    setCallData(data)
}



useEffect(() => {
    setOpen(props.Open)
    let value = []

    axios.get("/api/users/followList/" + props.userId).then((response) => {
    console.log('1')
        async function AsyncFunc() {
          try {
            await response.data.following.reduce(
              async (previousPromise, list) => {
                await previousPromise;

                await axios.get("/api/users/findId/" + list.followingId).then((response) => {
                    console.log("3");
                    value.push(response.data);
                });
              },Promise.resolve);
          } catch (error) {
            setListData(null);
          }
        }
    
        AsyncFunc().then(()=>{
            setloading(true)
            setListData(value)
            console.log(value)
        })

      });

      return () => {
        setListData(null)
      }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[props.Open])


const handleClose =() => {
    setOpen(false)
    props.onModalClose(false)

}
  

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: "50vw",
    minWidth:"300px",
    height: "70vh",
    boxShadow: 24,
    p: 4,
    padding: "0",
    overflowY:"scroll"

  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
          loading 
          ? null 
          : <CircularProgress
              sx={{
                position:'absolute',
                top:'calc(50% - 20px)',
                left:'calc(50% - 20px)'
              }}
            />
        }
          <List sx={{padding:0}}>
            {ListData &&
              ListData.map((list) => {
                return (
                  <ListItem key={list?._id}>
                    <ListItemButton onClick={()=>{
                      history.push("/profile/"+list?._id)
                      props.onModalClose(false)
                    }}>
                      <ListItemAvatar>
                        <Avatar alt={list?.name} src={list?.image} />
                      </ListItemAvatar>
                      <ListItemText primary={list?.name} />
                    </ListItemButton>

                    <FollowingCmp
                        followerId={list?._id}
                        followingId={userData?._id}
                        getFunc={getFunc}
                    />
                  </ListItem>
                );
              })}
          </List>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default FollowList