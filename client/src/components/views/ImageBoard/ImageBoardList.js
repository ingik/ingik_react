import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ImageBoard from './ImageBoard'
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';

function ImageBoardList(props) {

  const [PreviewList,setPreviewList] = useState([])
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [ParamKey, setParamKey] = useState("")

  const [Length,setLength] = useState(0)


  //intersection observer
  const viewport = useRef(null)
  const target = useRef(null)

  let number = 2

  
  useEffect(() => {

    async function get() {
      const result = await axios.get("/api/boards/imageBoardList");
      const value = [];

      console.log(result)

      if(result){
        result.data.map((list) => {
          console.log(list);
          list.image[0]._id = list._id;

          axios.all([axios.get("/api/boards/recommandLength/" + list._id),axios.get("/api/boards/commentLength/"+list._id)])
          .then(axios.spread((response1,response2)=>{

            console.log(response1.data)
            list.image[0].recommand = response1.data[0]?.recommand.length
            console.log(response2.data)
            list.image[0].comment = response2.data[0]?.commentList.length
            
            setLength(list.image[0]?.recommand);
          }))
          
          value.push(list.image[0]);

        });
        console.log(value)
        setPreviewList(value);
      }
      
    }

    get()
    
  },[])


  const loadItems = () => {
    console.log('loadItems')
    axios.get('/api/boards/imageBoardList/'+ number).then(response => {
      
      setPreviewList((prevState) => {
        return [...prevState, ...response.data]
      })
    })

  }

  useEffect(() => {

    const options = {
      root : viewport.current,
      threshold: 0.5,
    }

    const handleintersection = (entries, observer) => {
      console.log(entries)

      entries.forEach((entry) => {
        if(!entry.isIntersecting){
          return ;
        }

        loadItems();
        number++
        observer.unobserve(entry.target)
        observer.observe(target.current)
      })
    }

    const io = new IntersectionObserver(handleintersection,options)

    if(target.current){
      io.observe(target.current)
    }

    //clean up
    return () => io && io.disconnect();

  },[viewport, target])
  

  
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
  width:'1000px',
  height:'500px',
  boxShadow: 24,
  p: 4,
  padding:'0',
  
};

const HoverStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  textAlign: "center",
  backgroundColor: "red"
}

const LeaveStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  textAlign: "center",
}

  return (
    <div style={{ paddingTop: "64px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          // height: "100vh",
          marginTop: "5vh",
        }}

      >
        <ImageList
          sx={{ width: "70%", height: "100%", listStyleType: "none"}}
          cols={3}
          ref={ viewport }

        >
          {
          PreviewList && PreviewList.map((item,index) => {
            const lastEl = index === PreviewList.length - 1
            console.log(lastEl)
            return (
              <ImageListItem 
                key={index}
                >
                <img
                  src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading="lazy"
                  ref={lastEl ? target : null}
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
                    <FavoriteIcon sx={{ verticalAlign: "middle" }}/>
                    <span style={{verticalAlign:'middle',margin:'0 15px 0 5px'}}>{item.recommand}</span>
                    <CommentIcon sx={{ verticalAlign: "middle" }} />
                    <span style={{verticalAlign:'middle',margin:'0 15px 0 5px'}}>{item.comment}</span>
                  </div>
                </div>
              </ImageListItem>
            )
          }
            )}
        </ImageList>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ImageBoard paramKey={ParamKey} contentPosition={true}></ImageBoard>
        </Box>

      </Modal>
    </div>
  );
}

export default withRouter(ImageBoardList);
