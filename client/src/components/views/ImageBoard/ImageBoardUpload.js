import { ImageListItem,ImageList, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { shallowEqual, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import  { TextField , Button , Avatar , Typography } from '@mui/material'
import Modal from '@mui/material/Modal';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



function ImageBoardUpload(props) {
  const userData = useSelector((state) => state.user.userData, shallowEqual);
  
  //preview image
  const [ImageListValue, setImageListValue] = useState([]);
  const [ImageArr, setImageArr] = useState("");
  const [PreviewArr, setPreviewArr] = useState([]);
  const [Content, setContent] = useState("");
  const ImgRef = useRef()
  const MainRef = useRef()
  const labelRef = useRef()


  const ImageUploads = (event) => {
    event.preventDefault();

    console.log('imageUPload')

    if (event.target.files) {
      console.log("files : " + event.target.files);
      setImageArr(Array.from(event.target.files));
      setPreviewArr(Array.from(event.target.files));
    }
    
    let ArrayArr = Array.from(event.target.files)

    // let value = []
    // ArrayArr.map((list) => {
      // const reader = new FileReader();
      // reader.readAsDataURL(list);
      // reader.onload = function (event) {
      //   value.push(event.target.result);
      //   setImageListValue([...event.target.result])
      // };
    // });

    let fileURLs = [];
   
    let file;
    for (let i = 0; i < ArrayArr.length; i++) {
      file = ArrayArr[i];
    
      let reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result);
        fileURLs[i] = reader.result;
        setImageListValue([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }

    labelRef.current.style.display = "none"
    MainRef.current.style.width = 500+"px";
    ListRef.current.style.width = ArrayArr.length * 500 + "px";
    console.log(ListRef.current.style.width)
  };

  useEffect(()=>{
    MainRef.current.style.width = 0+"px";
  },[])

  



  function result(){
    return <div
    style={{
      width: "500px",
      margin: "auto",
      overflowX: "hidden",
      display: "inline-block",
      position: "relative",
    }}

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
        style={Number >= ImageListValue.length - 1 ? none : display}
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
      {ImageListValue && ImageListValue.map((image, index) => (
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
              src={image}
              ref={ImgRef}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
  }


  

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const Data = new FormData();

    console.log(ImageArr);
    
    
    Data.append("userName", userData.name);
    ImageArr.map((imageArr) => {
      Data.append("ImageArr", imageArr);
      console.log(Data.get("ImageArr"));
    });
    
    console.log(Data.getAll('ImageArr'));
 
    console.log(Data.get("ImageArr"));
    console.log("Data.name : " + Data.get("userName"));

    axios
      .post("/api/boards/imageBoardUpload", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        
        let data = [];
        console.log(response.data)

        response.data.map((list) => {
          let value = {
            key : list.key,
            img : list.location
          }
          data.push(value);
        });

        console.log(data);
        console.log("imageUpload");

        let body = {
          user: userData._id,
          content: Content,
          image: data,
        };

        console.log(body);

        axios.post("/api/boards/imageBoardCreate", body).then((response) => {
          console.log(response.data);
        });
      });

      props.handleClose(false)
  };

  const onContentHander = (event) => {
    setContent(event.target.value);
  };












  const ListRef = useRef({ x: 0, y: 0 });
  const [Number,setNumber] = useState(0)



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
    console.log(ImageList.length);
    console.log(ImgRef.current.offsetWidth)
    
    if (Number >= ImageListValue.length - 1) {
      return console.log("lastpage");
    }

    setNumber(Number + 1)

    ListRef.current.style.transition = "300ms";
    ListRef.current.style.transform = ListRef.current.style.transform + `translateX(-${ImgRef.current.offsetWidth}px)`;
    console.log(ListRef.current.style.transform)
    console.log("right");
  };

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

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="file"
          id="input-file"
          accept="image/*"
          onChange={ImageUploads}
          multiple
          style={{ display: "none" }}
        ></input>
        <label
          htmlFor="input-file"
          style={{ width: "500px", height: "500px", display: "inline-block" }}
          ref={labelRef}
        >
          <div style={{height:'100%',position:'relative'}}>
          <AddCircleOutlineIcon style={{ fontSize: 250, position:'absolute',top:'calc(50% - 250px/2)',left:'calc(50% - 250px/2)',opacity:'0.3' }}/>
          </div>
        </label>
        {result()}
        <div
          className="rigthBox"
          style={{
            position: "absolute",
            display: "inline-block",
            width: "48.5%",
            padding: "10px",
          }}
        >
          <div style={{padding:'0 10px 0 10px'}}>
            <Avatar
              alt={userData?.name}
              src={userData?.image}
              style={{
                display: "inline-block",
                verticalAlign: "top",
                width: "32px",
                height: "32px",
                verticalAlign: "middle",
              }}
            />
            <Typography
              variant="body1"
              style={{ display: "inline-block", marginLeft: "10px" }}
            >
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "300",
                  display: "inline-block",
                  marginRight: "5px",
                  verticalAlign: "middle",
                }}
              >
                {userData?.name}
              </span>
            </Typography>
          </div>
          <div style={{padding:'0 10px 0 10px', margin:'10px 0 '}}>
          <TextField
            type="text"
            variant='outlined'
            value={Content}
            onChange={onContentHander}
            sx={{width:'100%'}}
            multiline={true}
            inputProps={{style: {height: '350px'}}}
            placeholder='문구를 입력해주세요.'
            size='500'
            row='500'
          />
          </div>
          <div style={{padding:'0 10px 0 10px'}}>
          <Button variant="outlined" onClick={onSubmitHandler} style={{width:'100%'}}>
            작성
          </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default withRouter(ImageBoardUpload);
