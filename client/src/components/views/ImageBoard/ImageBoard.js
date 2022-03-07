import  Box  from '@mui/material/Box';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import axios from 'axios';
import { Avatar, Button, TextField, Typography,InputAdornment  } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ImageBoardComment from './ImageBoardComment';
import ImageBoardUser from './ImageBoardUser';
import './ImageBoard.css'

import { useSelector,shallowEqual } from 'react-redux'
import RecommandCmp from '../../../moduls/RecommandCmp';
import RecommandLength from '../../../moduls/RecommandLength';

function ImageBoard(props) {
  const ListRef = useRef({ x: 0, y: 0 });

  const UserSelectData = useSelector((state) => state.user.userData);
  console.log(UserSelectData)
  const [UserData, setUserData] = useState({});
  const [ImageDataList, setImageDataList] = useState([]);
  const [Comment, setComment] = useState("");
  const [CommentStatus, setCommentStatus] = useState(0)
  const [Number,setNumber] = useState(0)
  const ImgRef = useRef()


  const onLeftMove = (event) => {

    console.log(Number)
    if (Number <= 0) {
      return console.log("firstpage");
    }

    setNumber(Number - 1)
    ListRef.current.style.transition = "300ms";
    ListRef.current.style.transform = ListRef.current.style.transform + `translateX(${ImgRef.current.offsetWidth}px)`;
    console.log(ListRef.current.style.transform)
    console.log("Left");
  };
  
  const onRightMove = () => {
    
    console.log(Number)
    console.log(ImageDataList.length);
    console.log(ImgRef.current.offsetWidth)
    
    if (Number >= ImageDataList.length - 1) {
      return console.log("lastpage");
    }

    setNumber(Number + 1)

    ListRef.current.style.transition = "300ms";
    ListRef.current.style.transform = ListRef.current.style.transform + `translateX(-${ImgRef.current.offsetWidth}px)`;
    console.log(ListRef.current.style.transform)
    console.log("right");
  };

  useEffect(() => {
    axios.get("/api/boards/imageBoard/" + props.paramKey).then((response) => {
      if (response.data) {
        console.log(response.data)
        setUserData(response.data);
        setImageDataList(response.data[0].image);
      } else {
        console.log("no imageBoardData");
      }
    });
  }, []);
  
  
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

    let body = {

      boardId : UserData[0]._id,
      commentList : {
        userId : UserSelectData._id,
        content : Comment 
      }

    };

    setCommentStatus(CommentStatus + 1)

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

  const [RecState,setRecState] = useState(0)

  function ContentBox(){
    console.log()

    if( props.contentPosition === true){
      console.log("right")
      console.log(UserData[0]?._id)
    return <div
        className="rigthBox"
        style={{ position: "absolute", display: "inline-block",width:'48.5%',padding:'10px' }}
      >
        <List>
          <ImageBoardUser userId={UserData[0]?.user}/>
        </List>

        <div className="ScrollbarStyle">
          <List style={{padding :'8px 16px'}}>
            <div> {UserData[0]?.content}</div>
          </List>
          <List>
              <ImageBoardComment paramKey={ props.paramKey } CommentStatus={ CommentStatus }/>
          </List>
        </div>

        <div className="buttonMenu">
          <RecommandCmp boardId={UserData[0]?._id} recommandId={UserSelectData._id} getRec={setRecState}/>
          <div style={{margin:'5px 0 5px', display:'inline-block'}}>좋아요</div><RecommandLength boardId={UserData[0]?._id} testRec={RecState}/>
        </div>

        <div className="commentCreate" style={{ width: "100%" }}>
          <form onSubmit={onSubmitHandler} style={{ width: "100%" }}>
            <TextField 
            value={Comment} 
            onChange={onCommentHandler} 
            style={{width:'100%',padding:'0'}}
            variant='outlined'
            InputProps={{
              endAdornment: <Button onClick={onSubmitHandler} postion="end">작성</Button>
            }}
            >
            </TextField>
          </form>
        </div>
      </div>
    }

    if(props.contentPosition  === false){
      console.log("bottom")
      return <div
      className="rigthBox"
      style={{ width:'500px'}}
    >
      <List sx={{display:'inline-block'}}>
        <ListItem>
        <ImageBoardUser userId={UserData[0]?.user}/>
          <div style={{display:'inline-block'}}> {UserData[0]?.content}</div>
          </ListItem>
      </List>

      {/* <div className="ScrollbarStyle"> */}
        
        {/* <List>
            <ImageBoardComment paramKey={ props.paramKey } CommentStatus={ CommentStatus }/>
        </List> */}
      {/* </div> */}

      <div className="buttonMenu">
        <RecommandCmp boardId={UserData[0]?._id} recommandId={UserSelectData?._id} />
      </div>

      <div className="commentCreate" style={{ width: "100%" }}>
        <form onSubmit={onSubmitHandler}>
          <TextField 
          value={Comment} 
          onChange={onCommentHandler} 
          style={{width:'100%',padding:'0'}}
          variant='outlined'
          InputProps={{
            endAdornment: <Button onClick={onSubmitHandler} postion="end">작성</Button>
          }}
          >
          </TextField>
        </form>
      </div>
    </div>
    }

  }


  return (
    <div>
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
                  ref={ImgRef}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      
      { ContentBox() }

    </div>
  );
}

export default ImageBoard;
