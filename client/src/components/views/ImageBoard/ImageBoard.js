import  Box  from '@mui/material/Box';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import axios from 'axios';
import { Button, TextField, Modal, Divider  } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ImageBoardComment from './ImageBoardComment';
import ImageBoardUser from './ImageBoardUser';
import './ImageBoard.css'

import { useSelector } from 'react-redux'
import RecommandCmp from '../../../moduls/RecommandCmp';

import useMediaQuery from '@mui/material/useMediaQuery';


function ImageBoard(props) {

  //media
  const mediaQuery = useMediaQuery("(min-width:641px)");

  const ListRef = useRef({ x: 0, y: 0 });

  const UserSelectData = useSelector((state) => state.user.userData);
  console.log(UserSelectData);
  const [UserData, setUserData] = useState({});
  const [ImageDataList, setImageDataList] = useState([]);
  const [Comment, setComment] = useState("");
  const [CommentStatus, setCommentStatus] = useState(0);
  const [Number, setNumber] = useState(0);

  const MainRef = useRef();
  const ImgRef = useRef();
  ImgRef.current = [];
  // const [CommentLength, setCommentLength] = useState(null)

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const onLeftMove = () => {

    console.log('Left');
    if (Number <= 0) {
      return console.log("firstpage");
    }
    setNumber(Number - 1);
    
    
    async function Left() {
      ImgRef.current[Number - 1].style.display = "table"
      ListRef.current.style.transition = "none";
      ListRef.current.style.transform = `translateX(-${ImgRef.current[Number].offsetWidth - 1}px)`;
    }
    
    Left().then(() => {
      setTimeout(()=>{
        ListRef.current.style.transition = "300ms";
        ListRef.current.style.transform = ListRef.current.style.transform + `translateX(${ImgRef.current[Number-1].offsetWidth}px)`;
      },0)
    });
  };

  const onRightMove = () => {
    console.log("startNum : " + Number);

    if (Number >= ImageDataList.length - 1) {
      return console.log("lastpage");
    }

    setNumber(Number + 1);
    console.log(window.innerWidth);
    console.log("ListRef.style.width : " + ListRef.current.style.width);

    ListRef.current.style.transition = "300ms";
    ListRef.current.style.transform = ListRef.current.style.transform + `translateX(-${ImgRef.current[Number].offsetWidth}px)`;
    
    setTimeout(() => {
      console.log("none");
      ListRef.current.style.transition = "none";
      ListRef.current.style.transform = ListRef.current.style.transform + `translateX(${ImgRef.current[Number].offsetWidth}px)`;

      ImgRef.current[Number].style.display = "none";
    }, 300);
    
  };

  useEffect(() => {
    let CleanUpBoolean = true;
    axios.get("/api/boards/imageBoard/" + props.paramKey).then((response) => {
      if (CleanUpBoolean) {
        console.log(response.data);
        setUserData(response.data);
        setImageDataList(response.data[0].image);
      }
    });

    return () => {
      console.log("imageBoard CleanUp");
      CleanUpBoolean = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("ImageDataList");
    ListRef.current.style.width = (ImageDataList.length + 3) * MainRef.current.offsetWidth  + "px";
  }, [ImageDataList]);

  const none = {
    position: "absolute",
    // zIndex: 100,
    color: "gray",
    opacity: 0.6,
    top: "calc(50% - 25px)",
    left: "calc(50% - 25px)",
    display: "none",
    fontSize: "50px",
  };

  const display = {
    position: "absolute",
    // zIndex: 100,
    color: "gray",
    opacity: 0.6,
    top: "calc(50% - 25px)",
    left: "calc(50% - 25px)",
    display: "inline",
    fontSize: "50px",
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    width: "84vw",
    height: "66vh",
    boxShadow: 24,
    p: 4,
    padding: "0",
  };

  const mobileStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width:'90vw',
    height:'82vh',
    boxShadow: 24,
    p: 4,
    padding:'0'
  }

  const onSubmitHandler = (event) => {
    
    event.preventDefault();

    if (Comment.trim().length !== 0) {
      

      console.log("CommentStatus : " + CommentStatus);

      let body = {
        boardId: UserData[0]._id,
        commentList: {
          userId: UserSelectData._id,
          content: Comment,
        },
      };

      if (props.contentPosition === true)
        ScrollRef.current.scrollIntoView(true);

      axios.post("/api/boards/imageBoardComment", body).then((response) => {
        setComment("");

        if (response.data) {
          setCommentStatus((prevState) => {
            return prevState = prevState + 1;
          });
          console.log(response.data);
        } else {
          console.log("Comment Data null");
        }
      });
    } else {
      console.log("no Value");
      return false;
    }


  };

  const onCommentHandler = (event) => {
    event.preventDefault();

    setComment(event.currentTarget.value);
  };

  const memoCommentStatus = useMemo(() => CommentStatus, [CommentStatus]);
  const ScrollRef = useRef(null)


  const onModalHandler = (event) => {
    setOpen(true);
  };

  const onCommentFocus = () => {
    MainRef.current.style.display = 'none'
    ScrollRef.current.style.height = '46vh'
  }
  
  const onCommentBlur = () => {
    MainRef.current.style.display = 'inline-block'
    ScrollRef.current.style.height = '14vh'
  }

  function ContentBox() {
    console.log();

    if (props.contentPosition === true) {
      console.log(UserData[0]?._id);
      return (
        <div
          className={mediaQuery ? `rigthBox` : `rigthBoxSmall`}
        >
          <List>
            <ImageBoardUser userId={UserData[0]?.user} boardId={UserData[0]?._id}/>
            <Divider />
          </List>

          <div className={
            mediaQuery ? 
            `ScrollbarStyle` :
            `ScrollbarStyleSmall`
          }
          ref={ScrollRef}
          >
            <List style={{ padding: "8px 16px" }}>
              <div> {UserData[0]?.content}</div>
            </List>
            <List>
              <ImageBoardComment
                paramKey={props.paramKey}
                CommentStatus={memoCommentStatus}
              />
            </List> 
          </div>
          <Divider sx={{paddingTop:'5px'}}/>
          <div className="buttonMenu">
            <RecommandCmp
              boardId={UserData[0]?._id}
              recommandId={UserSelectData._id}
            />
            
          </div>

          <div className="commentCreate" style={{ width: "100%" }}>
            <form
              onSubmit={onSubmitHandler}
              style={{ width: "100%" }}
            >
              <TextField
                value={Comment}
                onChange={onCommentHandler}
                style={{ width: "100%", padding: "0" }}
                variant="outlined"
                onFocus={mediaQuery ? null : onCommentFocus}
                onBlur={mediaQuery ? null : onCommentBlur}
                InputProps={{
                  endAdornment: (
                    <Button onClick={onSubmitHandler} postion="end"
                      disabled={Comment.trim() ? false : true}
                    >
                      작성
                    </Button>
                  ),
                }}
              ></TextField>
            </form>
          </div>
        </div>
      );
    }

    if (props.contentPosition === false) {
      console.log("bottom");
      return (
        <div className='bottomBoxSmall' >
          <List sx={{ display: "inline-block" ,width:'100%'}}>
            <ListItem >
              <ImageBoardUser userId={UserData[0]?.user} boardId={UserData[0]?._id} />
            </ListItem>
              <div style={{ display: "block", marginLeft: "5px" , padding: "8px 16px" }}>
                {" "}
                {UserData[0]?.content}
              </div>
          </List>


          <div style={{margin:'8px 16px'}}>
          <div onClick={onModalHandler} style={{margin:'5px 0'}}>댓글보기..</div>
          <Divider />
          <div className="buttonMenu" style={{margin:'5px 0'}}>
            <RecommandCmp
              boardId={UserData[0]?._id}
              recommandId={UserSelectData._id}
            />
          </div>
          <div className="commentCreate" style={{ width: "100%" }}>
            <form onSubmit={onSubmitHandler}>
              <TextField
                value={Comment}
                onChange={onCommentHandler}
                style={{ width: "100%", padding: "0" }}
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <Button onClick={onSubmitHandler} postion="end">
                      작성
                    </Button>
                  ),
                }}
              ></TextField>
            </form>
          </div>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={mediaQuery ?
                    style :
                    mobileStyle  }>
              <ImageBoard
                paramKey={props.paramKey}
                contentPosition={true}
              ></ImageBoard>
            </Box>
          </Modal>
        </div>
      );
    }
  }

  const ImageListFunc = () => {
    return (
      ImageDataList &&
      ImageDataList.map((image, index) => {
        return (
          <div key={index}
          style={
            props.contentPosition === false ?
          (mediaQuery ? {
            width: "42vw",
            height: "66vh",
            float: "left",
            display: "table",
            objectFit: "scale-down",
            backgroundImage:`url(${image.img})`,
            backgroundPosition:'center center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'contain'
          }
          :
          {
            width: "100vw",
            height: "52vh",
            float: "left",
            display: "table",
            objectFit: "scale-down",
            backgroundImage:`url(${image.img})`,
            backgroundPosition:'center center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'contain'
          })
          :
          (mediaQuery ? {
            width: "42vw",
            height: "66vh",
            float: "left",
            display: "table",
            objectFit: "scale-down",
            backgroundImage:`url(${image.img})`,
            backgroundPosition:'center center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'contain'
          }
          :
          {
            width: "90vw",
            height: "45vh",
            float: "left",
            display: "table",
            objectFit: "scale-down",
            backgroundImage:`url(${image.img})`,
            backgroundPosition:'center center',
            backgroundRepeat:'no-repeat',
            backgroundSize:'contain'
          })
          
        }
            alt={image.key}
            // src={image.img}

            ref={(el) => (ImgRef.current[index] = el)}
          />
        );
      })
    );
  };

  return (
    <div>
      <div
        className={props.contentPosition === false 
          ? (mediaQuery ? `mainRef` : `mainRefSmallCenter`) 
          : (mediaQuery ? `mainRef` : `mainRefSmall`)}
        ref={MainRef}
      >
        <div
          className="LeftButton"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "20%",
            height: "100%",
            zIndex: 100,
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
            zIndex: 100,
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
        className='ListDiv'
          style={{
            position: "relative",
            margin: "auto",
            // paddingBottom: "30px",
            // transform: `translateX(0)`,
          }}
          ref={ListRef}
        >
          {ImageListFunc()}
        </div>
      </div>

      {ContentBox()}
    </div>
  );
}

export default ImageBoard;
