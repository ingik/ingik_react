import  Box  from '@mui/material/Box';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { Avatar, Button, TextField, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { FixedSizeList } from 'react-window';

import { useSelector,shallowEqual } from 'react-redux'

function ImageBoard(props) {
  const ListRef = useRef({ x: 0, y: 0 });

  const UserSelectData = useSelector(
    (state) => state.user.userData,
    shallowEqual
  );


  // console.log(UserSelectData)

  const [UserData, setUserData] = useState({});
  const [ImageDataList, setImageDataList] = useState([]);
  const [Comment, setComment] = useState("");
  const [Recommand, setRecommand] = useState("");
  const [ListComment, setListComment] = useState([]);


  const [Number,setNumber] = useState(0)



  const onLeftMove = (event) => {

    console.log(Number)
    if (Number <= 0) {
      return console.log("firstpage");
    }

    setNumber(Number - 1)
    ListRef.current.style.transition = "300ms";
    ListRef.current.style.transform = ListRef.current.style.transform + `translateX(500px)`;
    console.log("Left");
  };
  
  const onRightMove = () => {
    
    console.log(Number)
    console.log(ImageDataList.length);
    
    if (Number >= ImageDataList.length - 1) {
      return console.log("lastpage");
    }
    setNumber(Number + 1)

    ListRef.current.style.transition = "400ms";
    ListRef.current.style.transform = ListRef.current.style.transform + `translateX(-500px)`;
    console.log("right");
  };

  useEffect(() => {
    axios.get("/api/boards/imageBoard/" + props.paramKey).then((response) => {
      if (response.data) {
        setUserDataEffect(response.data);
        setImageDataListEffect(response.data);
        setRecommandEffect(response.data);
      } else {
        console.log("no imageBoardData");
      }
    });
  }, []);


  useEffect(() => {
    axios.get("/api/baords/imageBoard/comment/" + props.paramKey).then((response) => {
      if(response.data){
        setListCommentEffect(response.data)
        // console.log(response.data)
      } else {
        console.log("no imageBoard Comment Data")
      }
    })

  },[ListComment])




  
  const setUserDataEffect = (data) => {
    console.log('setUserDataEffect')
    setUserData(data)
  }
  
  const setImageDataListEffect = (data) => {
    setImageDataList(data[0].image);
  }
  
  const setRecommandEffect = (data) => {
    setRecommand(data.recommand);
  }
  
  const setListCommentEffect = (data) => {
    setListComment(data[0].comment);
  }

  
  
  useEffect(() => {
    console.log('ImageDataList')
    ListRef.current.style.width = ImageDataList.length * 500 + "px";
  }, [ImageDataList]);

  const none = {
    position: "absolute",
    zIndex: 9999,
    color: "gray",
    opacity: 0.6,
    top: "calc(50% - 25px)",
    left: "calc(50% - 25px)",
    display: "none",
    fontSize: "50px",
  };

  const display = {
    position: "absolute",
    zIndex: 9999,
    color: "gray",
    opacity: 0.6,
    top: "calc(50% - 25px)",
    left: "calc(50% - 25px)",
    display: "inline",
    fontSize: "50px",
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // console.log('UserData : '+JSON.stringify(UserData[0]._id))
    let body = {
      user: UserSelectData,
      comment: Comment,
      _id: UserData[0]._id,
    };

    axios.post("/api/boards/imageBoardComment", body).then((response) => {
      setComment("");

      if (response.data) {
        console.log(response.data);
      } else {
        console.log("Comment Data null");
      }
    });
  };

  const onCommentHandler = (event) => {
    setComment(event.currentTarget.value);
  };


  const ScrollbarStyle = {
    overflowY: "scroll",
    height: "50vh",
    // '::-webkit-scrollbar' : { display: "none" }, 
  }

  return (
    <div>
      {/* ImageBoardComponent InfoBar 부분  */}

      {/* Image  */}
      <div
        style={{
          width: "500px",
          margin: "auto",
          overflowX: "hidden",
          display: "inline-block",
          position: "relative",
        }}
      >
        <div
          className="LeftButton"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "20%",
            height: "100%",
            zIndex: 1000,
          }}
          onClick={onLeftMove}
        >
          <ArrowBackIosNewIcon
            style={Number <= 0 ? none : display}
            fontSize="large"
          />
        </div>

        <div
          className="RigthButton"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "20%",
            height: "100%",
            zIndex: 9999,
            
          }}
          onClick={onRightMove}
        >
          <ArrowForwardIosIcon
            style={Number >= ImageDataList.length - 1 ? none : display}
            fontSize="large"
          />
        </div>
        {/* 리스트사이즈 가변적일 필요가 이씀 */}

        <div
          style={{
            position: "relative",
            width: "",
            margin: "auto",
            paddingBottom: "30px",
            transform: `translateX(0)`,
          }}
          ref={ListRef}
        >
          {ImageDataList?.map((image, index) => (
            <div
              style={{
                height: "500px",
                width: "500px",
                float: "left",
                display: "inline-block",
              }}
              key={index}
            >
              <div
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                <Box
                  component="img"
                  sx={{
                    height: "500px",
                    width: "500px",
                    float: "left",
                    display: "table",
                  }}
                  alt={image.name}
                  src={image.img}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rigthBox"
        style={{ position: "absolute", display: "inline-block" }}
      >
        <List>
        <ListItem>
              <Avatar
                alt={UserData[0]?.user.name}
                src={UserData[0]?.user.image}
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                }}
              />
              <Typography
                variant="h6"
                component="div"
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                  margin: "5px 0 0 15px",
                }}
              >
                {UserData[0]?.user.name}
              </Typography>
            </ListItem>
        </List>
        <div
          style={ ScrollbarStyle }
        >
          <List>
            
            <div>{UserData[0]?.content}</div>
          </List>
          <List>
            {ListComment.map((com, index) => {
              return (
                <ListItem key={index}>
                  <Avatar
                    alt={com.user.name}
                    src={com.user.image}
                    style={{
                      display: "inline-block",
                      verticalAlign: "top",
                    }}
                  />
                  <Typography>{com.content}</Typography>
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className="buttonMenu"></div>
        <div className="commentCreate" style={{ width: "100%" }}>
          <form onSubmit={onSubmitHandler}>
            <TextField value={Comment} onChange={onCommentHandler}></TextField>
            <Button onClick={onSubmitHandler}>작성</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ImageBoard;
