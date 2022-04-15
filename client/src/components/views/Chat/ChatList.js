import { Avatar, Box, Button, ListItem, ListItemButton, Typography, List } from '@mui/material'
import axios from 'axios'
import React, { useMemo } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ChatAddUser from './ChatAddUser'
import DMList from './DMList'
import Drawer from '@mui/material/Drawer';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import './Chat.css'
import useMediaQuery from '@mui/material/useMediaQuery';

function ChatList(props) {

    const mediaQuery = useMediaQuery('(min-width:600px)');

    const userData = useSelector(state => state.user.userData)
    
    const [Data,setData] = useState([])
    const [ModalOpen, setModalOpen] = useState(false)
    const [SelectUser, setSelectUser] = useState(null)
    const [OnSideBar, setOnSideBar] = useState(false)

    const [SelectUserId, setSelectUserId] = useState(null)
    const [SelectUserName, setSelectUserName] = useState(null)
    const [SelectUserImage, setSelectUserImage] = useState(null)

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOnSideBar(open)
     };
    
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

    const list = () => {
      console.log('list')

      return <Box
        sx={{ width: '100vw', height:'100vh'  }}
        role="presentation"
        // onKeyDown={toggleDrawer(false)}
        >
        <Button 
          onClick={toggleDrawer(false)}
          variant='text'
          sx={{margin:'10px'}}
        >
          <ArrowBackIcon sx={{display:'inline-block'}}/>
        </Button>
        <div style={{display:'inline-block'}}>
          <Avatar
                      alt={SelectUserName}
                      src={SelectUserImage}
                      style={{
                        display: "inline-block",
                        verticalAlign: "top",
                        width: "32px",
                        height: "32px",
                        verticalAlign:"middle",
                        marginRight:"10px"
                      }}
                    />
                    <Typography
                      variant="body1"
                      style={{ display: "inline-block", marginLeft: "5px",verticalAlign:"middle" }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: "300",
                          display: "inline-block",
                          marginRight: "5px",
                        }}
                      >
                        {SelectUserName}
                      </span>
                    </Typography>
                    </div>
        <DMList OtherUserId={SelectUserIdMemo} />
      </Box>
    }

    
  console.log(SelectUserIdMemo)

  const toggleIdCheck = () => {
    if(SelectUserIdMemo){
      toggleDrawer(true)
    }
  }


  const Test = () => {

    if(mediaQuery){
      return <div style={{ paddingTop: "64px" }}>
      <div>
        <ChatAddUser
          Open={ModalOpen}
          onModalClose={onModalClose}
          childFunc={childFunc}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "16rem",
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
                      setSelectUserId(data?._id);
                      setSelectUserImage(data.image)
                        setSelectUserName(data.name)
                    }}
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

        {SelectUserIdMemo !== null ? (
          <DMList OtherUserId={SelectUserIdMemo} />
        ) : (
          <div style={{ width: "70vh" }}></div>
        )}
      </div>
    </div>
    }else{
      return <div style={{ paddingTop: "64px" ,height:'80vh'}}>
        <div>
          <ChatAddUser
            Open={ModalOpen}
            onModalClose={onModalClose}
            childFunc={childFunc}
          />
        </div>

        <Drawer
          anchor="left"
          open={OnSideBar} //true false
          onClose={toggleDrawer(false)}
        >
          {list()}

        </Drawer>
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 66px)",
          }}
        >
          <Box
            sx={{
              width: 250,
              // height: 400,
              minWidth: 180,
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <Button
                variant="contained"
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
                      onClick={()=>{
                        // toggleDrawer(true)
                        // toggleIdCheck()
                        setOnSideBar(true)
                        setSelectUserId(data._id)
                        setSelectUserImage(data.image)
                        setSelectUserName(data.name)
                      }}
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
        </div>
        
      </div>
    }
  }

  return (
    Test()
  )

    // return mediaQuery ? (
    //   <div style={{ paddingTop: "64px" }}>
    //     <div>
    //       <ChatAddUser
    //         Open={ModalOpen}
    //         onModalClose={onModalClose}
    //         childFunc={childFunc}
    //       />
    //     </div>

    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           width: "16rem",
    //           // height: 400,
    //           minWidth: 180,
    //           bgcolor: "background.paper",
    //         }}
    //       >
    //         <ListItem>
    //           <Button
    //             variant="contained"
    //             // onClick={onClickHandler}
    //             onClick={onModalOpen}
    //             sx={{ marginTop: "10px" }}
    //           >
    //             ADD USER
    //           </Button>
    //         </ListItem>
    //         {Data &&
    //           Data.map((data, index) => {
    //             return (
    //               <ListItem key={index} component="div" disablePadding>
    //                 <ListItemButton
    //                   onClick={() => {
    //                     setSelectUserId(data?._id);
    //                   }}
    //                 >
    //                   <Avatar
    //                     alt={data?.name}
    //                     src={data?.image}
    //                     style={{
    //                       display: "inline-block",
    //                       verticalAlign: "top",
    //                       width: "32px",
    //                       height: "32px",
    //                     }}
    //                   />
    //                   <Typography
    //                     variant="body1"
    //                     style={{ display: "inline-block", marginLeft: "5px" }}
    //                   >
    //                     <span
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "300",
    //                         display: "inline-block",
    //                         marginRight: "5px",
    //                       }}
    //                     >
    //                       {data?.name}
    //                     </span>
    //                   </Typography>
    //                 </ListItemButton>
    //               </ListItem>
    //             );
    //           })}
    //       </Box>

    //       {SelectUserIdMemo !== null ? (
    //         <DMList OtherUserId={SelectUserIdMemo} />
    //       ) : (
    //         <div style={{ width: "70vh" }}></div>
    //       )}
    //     </div>
    //   </div>
    // ) : (


    //   //mobile
    //   <React.Fragment>
    //   <div style={{ paddingTop: "64px" }}>
    //     <div>
    //       <ChatAddUser
    //         Open={ModalOpen}
    //         onModalClose={onModalClose}
    //         childFunc={childFunc}
    //       />
    //     </div>

    //     <Drawer
    //       anchor="left"
    //       open={OnSideBar} //true false
    //       onClose={toggleDrawer(false)}
    //     >
    //       {list()}

    //     </Drawer>
    //     <div
    //       style={{
    //         width: "100%",
    //         height: "calc(100vh - 66px)",
    //       }}
    //     >
    //       <Box
    //         sx={{
    //           width: 250,
    //           // height: 400,
    //           minWidth: 180,
    //           bgcolor: "background.paper",
    //         }}
    //       >
    //         <ListItem>
    //           <Button
    //             variant="contained"
    //             // onClick={onClickHandler}
    //             onClick={onModalOpen}
    //             sx={{ marginTop: "10px" }}
    //           >
    //             ADD USER
    //           </Button>

    //         </ListItem>
    //         {Data &&
    //           Data.map((data, index) => {
    //             return (
    //               <ListItem key={index} component="div" disablePadding>
    //                 <ListItemButton
    //                   onClick={()=>{
    //                     // toggleDrawer(true)
    //                     toggleIdCheck()
    //                     setSelectUserId(data._id)
    //                   }}
    //                 >
    //                   <Avatar
    //                     alt={data?.name}
    //                     src={data?.image}
    //                     style={{
    //                       display: "inline-block",
    //                       verticalAlign: "top",
    //                       width: "32px",
    //                       height: "32px",
    //                     }}
    //                   />
    //                   <Typography
    //                     variant="body1"
    //                     style={{ display: "inline-block", marginLeft: "5px" }}
    //                   >
    //                     <span
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "300",
    //                         display: "inline-block",
    //                         marginRight: "5px",
    //                       }}
    //                     >
    //                       {data?.name}
    //                     </span>
    //                   </Typography>
    //                 </ListItemButton>
    //               </ListItem>
    //             );
    //           })}
    //       </Box>
    //     </div>
        
    //   </div>
    //   </React.Fragment>
    // );
}

export default React.memo(withRouter(ChatList))
