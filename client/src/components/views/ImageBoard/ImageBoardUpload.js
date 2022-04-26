import { ImageListItem,ImageList, Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { shallowEqual, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import  { TextField , Button , Avatar , Typography } from '@mui/material'

import './ImageBoard.css'


import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import useMediaQuery from '@mui/material/useMediaQuery';




function ImageBoardUpload(props) {
  const userData = useSelector((state) => state.user.userData, shallowEqual);

  //media
  const mediaQuery = useMediaQuery('(min-width:641px)');
  const heightQuery = useMediaQuery('(min-heigth:500px)')

  
  //preview image
  const [ImageListValue, setImageListValue] = useState([]);
  const [ImageArr, setImageArr] = useState("");
  const [PreviewArr, setPreviewArr] = useState([]);
  const [Content, setContent] = useState("");
  const [ImageActive, setImageActive] = useState(null)
  const [ButtonCheck, setButtonCheck] = useState(null)
  const [HeightCheck, setHeightCheck] = useState(false)
  const [MoblieKeyboard, setMobileKeyboard] = useState(false)
  
  const ImgRef = useRef()
  ImgRef.current=[];

  const MainRef = useRef()
  const labelRef = useRef(null)
  const TextRef = useRef(null)


  const ImageUploads = (event) => {
    event.preventDefault();

    console.log('imageUPload')

    if (event.target.files) {
      console.log("files : " + event.target.files);
      setImageArr(Array.from(event.target.files));
      setPreviewArr(Array.from(event.target.files));
    }
    
    let ArrayArr = Array.from(event.target.files)

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
    MainRef.current.style.display = "inline-block"
    ListRef.current.style.width = (ArrayArr.length+1) * MainRef.current.offsetWidth+"px";
    setImageActive(true)
    console.log(ListRef.current.style.width)
    console.log('check : '+HeightCheck)
  };
  

  

  function result(){
    return <div
    // className={mediaQuery ? `mainUpRef` : (heightQuery ? `mainUpRefNone` : `mainUpRefSmall`)}
    className={mediaQuery ? `mainUpRef` : `mainUpRefSmall`}
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
      className='ListDiv'
      style={{
        position: "relative",
        margin: "auto",
      }}
      ref={ListRef}
    >
      {
        ImageListFunc()
        }
    </div>
  </div>
  }

  const ImageListFunc = () => {


    return ImageListValue && ImageListValue.map((image, index) => {

      return (<div
              style={
                mediaQuery ?
              {
                width: "42vw",
                height: "66vh",
                float: "left",
                display: "table",
                objectFit: "scale-down",
                backgroundImage:`url(${image})`,
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
                backgroundImage:`url(${image})`,
                backgroundPosition:'center center',
                backgroundRepeat:'no-repeat',
                backgroundSize:'contain'
              }
            }
              alt={image?.name}
              src={image}
            
              ref={el => ImgRef.current[index] = el}
            />
           
      );
    })
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

          props.history.push('/')
          window.location.reload()
        });
      });

      props.handleClose(false)
  };

  const onContentHander = (event) => {
    console.log(event)
    setContent(event.target.value);
    
  };


  const [height, setheight] = useState(window.innerHeight);

const resizeWindow = () => {
  setheight(window.innerHeight);
};



  useEffect(() => {
    window.addEventListener('resize', resizeWindow)

    console.log(height)
    console.log(HeightCheck)
    if(height < 500){
      console.log(height)
      setHeightCheck(true)
    }else{
      console.log(height)
      setHeightCheck(false)
    }
    
    return () => {
      window.removeEventListener('resize', resizeWindow)
    }
  },[height])








  const ListRef = useRef({ x: 0, y: 0 });
  const [Number,setNumber] = useState(0)



  const onLeftMove = () => {

      
    
    console.log(Number)
    if (Number <= 0) {
      return console.log("firstpage");
    }
    setNumber(Number - 1)
    
    async function Left(){
      ImgRef.current[Number-1].style.display = "table"
      ListRef.current.style.transition = "none";
      ListRef.current.style.transform = ListRef.current.style.transform + `translateX(-${ImgRef.current[Number].offsetWidth}px)`;

    }
    
    Left().then(() => {
        ListRef.current.style.transition = "300ms";
        ListRef.current.style.transform = ListRef.current.style.transform + `translateX(${ImgRef.current[Number-1].offsetWidth}px)`;
    })
   


    console.log(ListRef.current.style.transform)
    console.log("Left");

  };
  
  const onRightMove = () => {
    
    console.log('startNum : ' +Number)
    
    if (Number >= ImageListValue.length - 1) {
      return console.log("lastpage");
    }

    setNumber(Number + 1)
    console.log(window.innerWidth)
    console.log('ListRef.style.width : '+ ListRef.current.style.width)
    
      ListRef.current.style.transition = "300ms";
      ListRef.current.style.transform = ListRef.current.style.transform + `translateX(-${ImgRef.current[Number].clientWidth}px)`;

      setTimeout(() => {
        
        console.log('none')
        ListRef.current.style.transition = "none";

        // ListRef.current.style.width = ((ImageListValue.length-1) - Number) * MainRef.current.offsetWidth + "px";
        ListRef.current.style.transform = ListRef.current.style.transform + `translateX(${ImgRef.current[Number].clientWidth}px)`;
        ImgRef.current[Number].style.display = "none"
      }, 300);


    // ListRef.current.style.width = ImageListValue.length * ImgRef.current[Number].clientWidth + "px";


    console.log('MainRef.style.width2 : '+ MainRef.current.style.width)
    console.log('ListRef.style.width2 : '+ ListRef.current.style.width)
    console.log(ListRef.current.style.transform)
    console.log(ImgRef.current[Number].style)
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

  const uploadContentBox = {
    height:"40vh"
  }

  const uploadContentBoxSmall = {
    height:"17vh"
  }
  const uploadContentBoxSmallMobile = {
    height:"42vh"
  }

  // const onCheckButton = () => {
  //   if(ImageActive === true && ButtonCheck === true){
  //   }else{
  //     return <React.Fragment/>
  //   }
  // } 

  const FocusOn = () => {
    console.log(HeightCheck);
      // if (HeightCheck === true) {
        MainRef.current.style.display = `none`;
      // }
  };
  

  const FocusOut = () => {
    MainRef.current.style.display = `inline-block`
    // setButtonCheck(false)
  }

  const onCommentFocus = () => {
    MainRef.current.style.display = 'none'
    setMobileKeyboard(true)
    // uploadContentBoxSmall.height = '40vh'
  }
  
  const onCommentBlur = () => {
    MainRef.current.style.display = 'inline-block'
    setMobileKeyboard(false)
    // uploadContentBoxSmall.height = '17vh'
  }

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
          className={
            mediaQuery ?
            `boardLabelLarge` :
            `boardLabelSmall`
          }
          // belLarge
          //    }
          ref={labelRef}
        >
          <div style={{ height: "100%", position: "relative" }}>
            <AddCircleOutlineIcon
              style={{
                fontSize: 250,
                position: "absolute",
                top: "calc(50% - 250px/2)",
                left: "calc(50% - 250px/2)",
                opacity: "0.3",
              }}
            />
          </div>
        </label>
        {result()}
        <div
          className={
            mediaQuery ?
            `rigthBox` :
            `rigthBoxSmall`
          }
        
        >
          <div style={{ padding: "0 10px 0 10px" }}>
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
          <div style={{ padding: "0 10px 0 10px", margin: "10px 0 " }}>
            <TextField
              type="text"
              variant="outlined"
              value={Content}
              onChange={onContentHander}
              sx={{ width: "100%" }}
              multiline={true}
              inputProps={{ style: mediaQuery ? uploadContentBox : (MoblieKeyboard ? uploadContentBoxSmallMobile : uploadContentBoxSmall) }}
              placeholder={ImageActive ?  `내용을 입력해주세요` : `이미지를 추가해주세요`}
              size="500"
              row="500"
              disabled={ImageActive ? false : true}
              ref={TextRef}
              
              onFocus={mediaQuery ? null : onCommentFocus}
              onBlur={mediaQuery ? null : onCommentBlur}
              // onFocus={() => mediaQuery ? null : (HeightCheck ? FocusOn() : null)}
              // onBlur={() => mediaQuery ? FocusOut() : FocusOut()}
            />
          </div>
          <div
            className='UploadButtonBox'
            
          >
           
           <Button
            className='CheckButton'
            variant='outlined'
            sx={mediaQuery ? {display:'none'} : (ButtonCheck === true ? {display:'block', width:'100%'} : {display:'none'})}
            >
              확인하기
            </Button>
            <Button
              variant="outlined"
              onClick={onSubmitHandler}

              className={
                heightQuery ?
                `UploadButtonNone` :
                `UploadButton`
              } 
            >
              작성
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default withRouter(ImageBoardUpload);
