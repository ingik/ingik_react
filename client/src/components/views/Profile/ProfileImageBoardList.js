import { Box, ImageList, ImageListItem, Modal } from '@mui/material';
import axios from 'axios';
import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ImageBoard from '../ImageBoard/ImageBoard';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './../ImageBoard/ImageBoard.css'

import useMediaQuery from '@mui/material/useMediaQuery';

function ProfileImageBoardList(props) {

  const mediaQuery = useMediaQuery('(min-width:641px)');

  
  const [PreviewList,setPreviewList] = useState([])
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [ParamKey, setParamKey] = useState("")

  const viewport = useRef(null)
  const target = useRef(null)
  const imageListRef = useRef(null)

  let DataLess = false

  let number = 1


  console.log(props.ParamsUserId)


  useEffect(() => {

    axios.get('/api/boards/imageBoard/profileList/'+props.ParamsUserId).then(response => {
      const value = [];

      async function AsyncFunc(){

        await response.data.reduce(async(previousPromise, list)=>{
        await previousPromise
          list.image[0]._id = list._id;
  
        const newElement = await axios
          .all([
            axios.get("/api/boards/recommandLength/" + list._id),
            axios.get("/api/boards/commentLength/" + list._id),
          ])
          .then(
            axios.spread((response1, response2) => {

              list.image[0].recommand = response1.data[0]?.recommand.length;
              list.image[0].comment = response2.data[0]?.commentList.length;

              return list.image[0];
            })
          );

          value.push(newElement)

        },Promise.resolve)
      }

      AsyncFunc().then(() => {
        setPreviewList(value)
        target.current.style.display="block"
      })

    })

   
  },[props.ParamsUserId])


  const loadItems = () => {

    console.log('loadItems')
    //수정
    axios.get('/api/boards/imageBoard/profileList/' + props.ParamsUserId + '/' + number).then(response => {
      console.log(response.data)

      let value = []

      if(response.data.length === 0) {
        DataLess = true
        // alert("마지막 data 입니다.")
        return console.log('no data')
      }

      response.data.map((list) => {
        console.log(list);
        list.image[0]._id = list._id;

        axios.all([axios.get("/api/boards/recommandLength/" + list._id),axios.get("/api/boards/commentLength/"+list._id)])
        .then(axios.spread((response1,response2)=>{

          list.image[0].recommand = response1.data[0]?.recommand.length
          list.image[0].comment = response2.data[0]?.commentList.length
          
          value.push(list.image[0]);
          // setPreviewList([...value])
          setPreviewList((prevState) => {
            return [...prevState, list.image[0]]
          })
        }))
      });
    })

  }

  useEffect(() => {

    const options = {
      root : viewport.current,
      threshold: 0,
    }

    const handleintersection = (entries, observer) => {
      console.log(entries)

      entries.forEach((entry) => {
        if(!entry.isIntersecting){
          return ;
        }
        observer.unobserve(entry.target)

        if(DataLess === false){

          console.log(DataLess)
        loadItems();
        number++
        setTimeout(() => {
          observer.observe(target.current)

        },1000)
      }
      })
    }

    const io = new IntersectionObserver(handleintersection,options)

    if(target.current){
      io.observe(target.current)
    }
    
    //clean up
    return () => io && io.disconnect();
  
  
  },[viewport,target.current])

  const onHoverHandler = (event) => {
    event.stopPropagation()
    console.log('hover')
    event.currentTarget.children[1].style = 'display:blcok'
  }

  
  const onLeaveHandler = (event) => {
    event.stopPropagation()
    console.log('leave')
    event.currentTarget.children[1].style=`display:none`
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width:'84vw',
    height:'66vh',
    boxShadow: 24,
    p: 4,
    padding:'0'
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
    
  return (
    <div>
    <Box
        className='boxSmall'
        ref={viewport}
      >
        <ImageList
          className={ mediaQuery 
            ? `profileMediaSmall`
            : `profileMediaLarge`
          }
          cols={3}
          ref={imageListRef}
        >
          {PreviewList && PreviewList.map((item, index) => {
            let lastEl = false;

            console.log(index)
            if (index === 15) {
              lastEl = true;
              // setlastElState(lastEl)
            }
            // if (index === PreviewList.length - 1) {
            //   lastEl = true;
            //   // setlastElState(lastEl)
            // }

            // console.log('lastEl : '+lastEl);
            return (
              <ImageListItem
                key={index}
                sx={{
                  margin: "auto",
                  width:'100%',
                  height:'100%'
                }}
                // ref={lastEl ? target : null}
                onMouseEnter={onHoverHandler}
                onMouseLeave={onLeaveHandler}
              >
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                  
                  style={{objectFit:'contain'}}
                />
                <div
                  className="LeaveStyle"
                  style={{ display: "none" }}
                  
                >
                  <div
                    style={{
                      display: "block",
                      backgroundColor: "black",
                      opacity:"0.4",
                      width: "100%",
                      height: "100%",
                    }}
                    onClick={function () {
                      setOpen(true);
                      setParamKey(item._id);
                    }}
                  >
                    
                  </div>
                  <div style={{position:'absolute',top:'calc(50% - 12px)',left:'calc(50% - 52.6px)',color:'white',zIndex:99}}>
                    <FavoriteIcon sx={{ verticalAlign: "middle" }} />
                    <span
                      style={{
                        verticalAlign: "middle",
                        margin: "0 15px 0 5px",
                      }}
                    >
                      {item.recommand}
                    </span>
                    <CommentIcon sx={{ verticalAlign: "middle" }} />
                    <span
                      style={{
                        verticalAlign: "middle",
                        margin: "0 15px 0 5px",
                      }}
                    >
                      {item.comment}
                    </span>
                    </div>
                </div>
              </ImageListItem>
            );
          })}

          <div
            style={{ width: "100%", display: "none", height: "30px" }}
            ref={target}
          ></div>
        </ImageList>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mediaQuery ?
                    style :
                    mobileStyle  }>
          <ImageBoard paramKey={ParamKey} contentPosition={true}></ImageBoard>
        </Box>
      </Modal>

    </div>
  )
}

export default ProfileImageBoardList