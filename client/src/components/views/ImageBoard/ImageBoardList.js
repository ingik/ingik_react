import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState  } from 'react';
import { withRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ImageBoard from './ImageBoard'
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';

import useMediaQuery from '@mui/material/useMediaQuery';
import './ImageBoard.css'


function ImageBoardList(props) {

  const mediaQuery = useMediaQuery('(min-width:641px)');

  const [PreviewList,setPreviewList] = useState([])

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [ParamKey, setParamKey] = useState("")

  //intersection observer
  const viewport = useRef(null)
  const target = useRef(null)

  const imageListRef = useRef(null)

  let number = 1

  
  useEffect(() => {

    console.log('useEffect')

    setTimeout(()=>{
      if(target.current){
        console.log("setTime 3000");
        target.current.style = `display:block`;
      }
    },2000)

      axios.get("/api/boards/imageBoardList").then(response => {
      const value = [];

      console.log(response.data)

      if(response.data){
        response.data && response.data.map((list) => {
          console.log(list);
          list.image[0]._id = list._id;

          axios.all([axios.get("/api/boards/recommandLength/" + list._id),axios.get("/api/boards/commentLength/"+list._id)])
          .then(axios.spread((response1,response2)=>{

            list.image[0].recommand = response1.data[0]?.recommand.length
            list.image[0].comment = response2.data[0]?.commentList.length
            
            value.push(list.image[0]);
            setPreviewList([...value])
            
          }))
          // value.push(list.image[0]);
          
        });
        // setPreviewList(value)
      }

    })

    return () => {
      setPreviewList([])
    }

    
  },[])


  const loadItems = () => {
    console.log('loadItems')
    axios.get('/api/boards/imageBoardList/'+ number).then(response => {
      console.log(response.data)

      let value = []

      if(response.data.length === 0) return console.log('no data')

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
        // value.push(list.image[0]);
        
      });


      // setPreviewList((prevState) => {
      //   return [...prevState, ...value]
      // })



    })

  }

  useEffect(() => {

    console.log('useLayoutEffect')
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

        loadItems();
        number++
        setTimeout(()=>{
          observer.observe(target.current)

        },1000)
      })
    }

    const io = new IntersectionObserver(handleintersection,options)

    if(target.current){
      io.observe(target.current)
    }

    //clean up
    return () => io && io.disconnect();

  },[viewport, target.current])



  

  
  const onHoverHandler = (event) => {

    // console.log('hover')
    event.currentTarget.children[0].style=`color:white; display:block; padding-top:50%;`
  }

  
  const onLeaveHandler = (event) => {
    // console.log('leave')
    event.currentTarget.children[0].style=`display:none`
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
  padding:'0',
  
};

const mobileStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width:'90vw',
  height:'80vh',
  boxShadow: 24,
  p: 4,
  padding:'0'
}

const mediaSmall = {
    width: "70%",
    height: "38em"
}

const mediaLarge = {
  width: "100%",
  height: "40em",
};

const boxSmall = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height:"100%",
};

const boxLarge = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  // marginTop: "5vh",
  height:"100%"

};


const LeaveStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  textAlign: "center",
}

  return (
    <div style={{ paddingTop: "64px", height: "calc(100vh - 66px)" }}>
      <Box
        style={
          mediaQuery
          ? boxLarge
          : boxSmall
        }
        ref={viewport}
      >
        <ImageList
          className="ImageListScroll"
          sx={ mediaQuery 
            ? mediaSmall
            : mediaLarge
          }
          cols={3}
          ref={imageListRef}
        >
          {PreviewList.map((item, index) => {
            let lastEl = false;

            if (index === PreviewList.length - 1) {
              lastEl = true;
            }

            console.log(lastEl);
            return (
              <ImageListItem
                key={index}
                sx={{ display: "inline-block" }}
              >
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                />
                <div
                  style={LeaveStyle}
                  onClick={function () {
                    setOpen(true);
                    setParamKey(item._id);
                  }}
                  onMouseEnter={onHoverHandler}
                  onMouseLeave={onLeaveHandler}
                >
                  <div style={{ display: "none" }}>
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
  );
}

export default withRouter(ImageBoardList);
