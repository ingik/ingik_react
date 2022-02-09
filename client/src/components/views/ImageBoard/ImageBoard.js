import  Box  from '@mui/material/Box';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';

function ImageBoard(props) {

  //  console.log(props.match.params.key)

    // const UserData = useSelector(state => state.user.userData,shallowEqual)
    const ListRef = useRef({x:0,y:0})

    const [UserData, setUserData] = useState({})
    const [ImageDataList, setImageDataList] = useState([])

    let number = 0
    
    const onLeftMove = (event) => {
      if (number <= 0) {
        return console.log('firstpage')
      }
        number--
        ListRef.current.style.transition = "300ms"
        ListRef.current.style.transform = ListRef.current.style.transform + `translateX(500px)`
        console.log('Left')        
      }

      const onRightMove = (event) => {
        console.log(ImageDataList.length)
        if (number >= ImageDataList.length-1) {
          return console.log('lastpage')
        }
        number++
        console.log('number : '+number)
        ListRef.current.style.transition = "300ms";
        ListRef.current.style.transform =
          ListRef.current.style.transform + `translateX(-500px)`;
        console.log("right");
      }
      
      useLayoutEffect(() => {
        axios.get('/api/boards/imageBoard/'+props.match.params.key).then(response => {
          if(response.data){
            console.log(response.data)
            setUserData(response.data)
            setImageDataList(response.data[0].image)
          }
        })
      },[])
      
      useLayoutEffect(() => {
      console.log(ImageDataList.length)
      console.log(ImageDataList)
      ListRef.current.style.width = (ImageDataList.length * 500) +'px'
      console.log(ListRef.current.style.width)
    },[ImageDataList])


    const back = {
              position: "absolute",
              zIndex: 9999,
              color: "red",
              opacity: 0.6,
              top: "calc(50% - 25px)",
              left: "calc(50% - 25px)",
              display :'none',
              fontSize: "50px",
    }

    const front = {
      position: "absolute",
      zIndex: 9999,
      color: "red",
      opacity: 0.6,
      top: "calc(50% - 25px)",
      left: "calc(50% - 25px)",
      display :'inline',
      fontSize: "50px",
    }


  return (
    <div>
      {/* ImageBoardComponent InfoBar 부분  */}
      상단반
      <div></div>
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
            style= { number > 0 ? back : front }
            
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
            style={{
              position: "absolute",
              zIndex: 9999,
              color: "red",
              opacity: 0.6,
              top: "calc(50% - 25px)",
              left: "calc(50% - 25px)",
              fontSize: "50px",
            }}
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


        <div>{UserData[0]?.content}</div>
      </div>
    </div>
  );
}

export default ImageBoard;
