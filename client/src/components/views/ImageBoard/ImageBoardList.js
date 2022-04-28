import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState  } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ImageBoard from './ImageBoard'
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {withRouter} from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';

import useMediaQuery from '@mui/material/useMediaQuery';
import './ImageBoard.css'
import { useSelector } from 'react-redux';


function ImageBoardList(props) {

  const mediaQuery = useMediaQuery('(min-width:641px)');

  const [PreviewList,setPreviewList] = useState([])

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [ParamKey, setParamKey] = useState("")

  const [loading, setloading] = useState(false)

  let DataLess = false

  //intersection observer
  const viewport = useRef(null)
  const target = useRef()
  const imageListRef = useRef(null)

  let number = 1

  let LoginUser = props.history
  console.log(LoginUser)


  
  useEffect(() => {


    //clean Up
    let CleanUpBoolean = true;

    // 1)
    // 리사이징을 구현하지 않아서 두가지 방식으로 데이터를 가져옴 1) 한번에 2) 받는대로
    axios.get("/api/boards/imageBoardList").then(response => {
      const value = [];
      async function AsyncFunc(){
        
        console.log(response.data)
        try {
          
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

        } catch (error) {

          setPreviewList(null)

        }
      }
      
      AsyncFunc().then(() => {
        if(CleanUpBoolean){
          setPreviewList(value)
          setloading(true)
          target.current.style.display="block"
        }
      })

    })

    //2)

    // axios.get("/api/boards/imageBoardList").then(response => {
    //   const value = [];

    //   console.log(response.data)
    //   console.log("1");

    //   async function AsyncFunc(){

    //   for(const list of response.data){
    //       list.image[0]._id = list._id;

    //       console.log("2");

    //     await axios.all([axios.get("/api/boards/recommandLength/" + list._id),axios.get("/api/boards/commentLength/" + list._id)])
    //       .then(axios.spread((response1, response2) => {
  
    //             list.image[0].recommand = response1.data[0]?.recommand.length;
    //             list.image[0].comment = response2.data[0]?.commentList.length;
  
    //             value.push(list.image[0]);
    //             setPreviewList([...value])
    //             console.log("3");

    //         })
    //       );

    //     console.log("4")
    //       }
    //   }

    //   AsyncFunc().then(()=>{
    //     target.current.style.display = "block"
    //   })


    // })

  
    
    return () => {
      setPreviewList([])
      CleanUpBoolean = false;

    }

    
  },[])


  const loadItems = () => {


    console.log('loadItems')
    //1)
    axios.get("/api/boards/imageBoardList/"+number).then(response => {
      const value = [];

      if(response.data.length === 0) {
        DataLess = true
        return console.log('last data')
      }

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
        setPreviewList((prevState) => {return [...prevState , ...value]})
        // setloading(true)
        try {
          target.current.style.display="block"
        } catch (error) {
          return target.current
        }
      })
      

    })

    //2)
    // axios.get('/api/boards/imageBoardList/'+ number).then(response => {
    //   console.log(response.data)

    //   let value = []

    //   if(response.data.length === 0) {
    //     DataLess = true
    //     alert("마지막 data 입니다.")
    //     return console.log('no data')
    //   }

    //   response.data.map((list) => {
    //     console.log(list);
    //     list.image[0]._id = list._id;

    //     axios.all([axios.get("/api/boards/recommandLength/" + list._id),axios.get("/api/boards/commentLength/"+list._id)])
    //     .then(axios.spread((response1,response2)=>{

    //       list.image[0].recommand = response1.data[0]?.recommand.length
    //       list.image[0].comment = response2.data[0]?.commentList.length
          
    //       value.push(list.image[0]);
    //       // setPreviewList([...value])
    //       setPreviewList((prevState) => {
    //         return [...prevState, list.image[0]]
    //       })
    //     }))
    //   });
    // })

  }

  useEffect(() => {


    const options = {
      root : viewport.current,
      threshold: 0,
    }


    const handleintersection = (entries, observer) => {
      target.current.style.display="none"

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
        // setTimeout(() => {
        observer.observe(target.current)

        // },1000)
       }

      })


    }
    

    const io = new IntersectionObserver(handleintersection,options)

    if(target.current){
      io.observe(target.current)
    }
    
    //clean up
    return () => {
      io && io.disconnect()
    };
    
  
  },[viewport,target.current])



  

  
  const onHoverHandler = (event) => {

    event.stopPropagation()
    event.currentTarget.children[1].style = 'display:blcok'
  }

  
  const onLeaveHandler = (event) => {
    event.stopPropagation()
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
  padding:'0',
  
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
    <div style={mediaQuery ? { paddingTop: "64px", height: "calc(100vh - 66px)" } :{ paddingTop: "64px"} }>
      <Box
        className='boxSmall'
        ref={viewport}
      >
        {
          loading 
          ? null 
          : <CircularProgress
              sx={{
                position:'absolute',
                top:'50%',
                left:'50%'
              }}
            />
        }
        <ImageList
          className={ mediaQuery 
            ? `mediaSmall`
            : `mediaLarge`
          }
          cols={3}
          ref={imageListRef}
        >
          {PreviewList && PreviewList.map((item, index) => {
            return (
              <ImageListItem
                key={index}
                sx={{
                  margin: "auto",
                  // width:'100%',
                  // height:'100%'
                }}
                onMouseEnter={onHoverHandler}
                onMouseLeave={onLeaveHandler}
                onClick={function () {
                  setOpen(true);
                  setParamKey(item._id);
                }}
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

          {
            PreviewList &&
            <div
            style={{ width: "100%", display: "none", height: "30px" }}
            ref={target}
          ></div>
          }
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

// export default withRouter(ImageBoardList);
export default withRouter(ImageBoardList);
