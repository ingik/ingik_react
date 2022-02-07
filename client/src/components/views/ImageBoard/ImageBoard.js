import  Box  from '@mui/material/Box';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from 'axios';

function ImageBoard() {

    const UserData = useSelector(state => state.user.userData,shallowEqual)
    const ListRef = useRef({x:0,y:0})
    const [MoveData, setMoveData] = useState()

    const onLeftMove = (event) => {
        ListRef.current.style.transition = "300ms"
        ListRef.current.style.transform = ListRef.current.style.transform + `translateX(500px)`
        
        console.log('Left')        
    }
    const onRightMove = (event) => {
        ListRef.current.style.transition = "300ms"
        ListRef.current.style.transform = ListRef.current.style.transform + `translateX(-500px)`
        console.log('right')
    }

    useEffect(() => {
      axios.get('').then(response => {
        
      })
    })

    //슬라이드 개수에 따라 if문 필요 귀찮아서 아직 안넣음

  return (
    <div>
        {/* ImageBoardComponent InfoBar 부분  */}
        상단반
      <div>

      </div>
      {/* Image  */} 
      <div
        style={{
          width: "500px",
          margin: "auto",
          overflowX: "hidden",
          display: "inline-block",
          position:"relative"
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
                  zIndex:9999,
                  
                }}
                onClick={onLeftMove}
              ></div>
              <div
                className="RigthButton"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "20%",
                  height: "100%",
                  zIndex:9999

                }}
                onClick={onRightMove}
              ></div>
        {/* 리스트사이즈 가변적일 필요가 이씀 */}
        <div
          style={{
            position: "relative",
            width: "3000px",
            margin: "auto",
            paddingBottom: "30px",
            transform: `translateX(0)`,
          }}
          ref={ListRef}
        >
          <div
            style={{
              height: "500px",
              width: "500px",
              float: "left",
              display: "inline-block",
            }}
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
                alt="The house from the offer."
                src="https://ingikbucket.s3.ap-northeast-2.amazonaws.com/samgu.png"
              />
              
            </div>
          </div>

          <div
            style={{
              height: "500px",
              width: "500px",
              float: "left",
              display: "inline-block",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "500px",
                width: "500px",
                float: "left",
                display: "table",
              }}
              alt="The house from the offer."
              src="https://ingikbucket.s3.ap-northeast-2.amazonaws.com/logo6.png"
            />
          </div>

          <div
            style={{
              height: "500px",
              width: "500px",
              float: "left",
              display: "inline-block",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "500px",
                width: "500px",
                float: "left",
                display: "table",
              }}
              alt="The house from the offer."
              src="https://ingikbucket.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20220130_213053017.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageBoard;
