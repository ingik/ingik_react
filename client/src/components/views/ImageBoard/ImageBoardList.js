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
  
  
  useEffect(() => {

    async function get() {
      const result = await axios.get("/api/boards/imageBoardList");
      const value = [];

      console.log(result)

      if(result){
        result.data.map((list) => {
          console.log(list);
          list.image[0]._id = list._id;
          // list.image[0].recommand = null

          axios.get("/api/boards/recommandLength/" + list._id)
            .then((response) => {

              if(response){

                console.log(response.data);
                console.log(response.data[0]?.recommand.length);
                // list.image[0].length = response.data[0]?.recommand.length;
                
              list.image[0].recommand = response.data[0]?.recommand.length;
              // setLength(response.data[0]?.recommand.length)

              setLength(list.image[0]?.recommand)
                console.log(list.image[0].recommand);
                console.log(list.image[0]);
              }
            });
            value.push(list.image[0]);
          


        });
        console.log(value)
        setPreviewList(value);
      }
      
    }

    get()


    
  },[])
  

  
  const onHoverHandler = (event) => {

    console.log('hover')
    console.log(event.currentTarget)
    // hoverStyletarget(event)
    hoverStyleChildren(event)
  }

  const hoverStyletarget = (event) => {
    event.currentTarget.style=`${HoverStyle}`
  }

  const hoverStyleChildren = (event) => {
    event.target.children[0].style=`color:white; display:block; padding-top:50%;`
  }
  
  const onLeaveHandler = (event) => {
    console.log('leave')
    // event.currentTarget.style=`${LeaveStyle}`
    console.log(event.currentTarget)
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
          sx={{ width: "70%", height: "100%", listStyleType: "none" }}
          cols={3}
        >
          {/* { PreviewListHandler() } */}
          {PreviewList &&
            PreviewList.map((item) => (
              <ImageListItem key={item.img}>
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
                    <FavoriteIcon sx={{ verticalAlign: "middle" }}/>
                    <span style={{verticalAlign:'middle',margin:'0 15px 0 5px'}}>{item.recommand}</span>
                    <CommentIcon sx={{ verticalAlign: "middle" }} />
                  </div>
                </div>
              </ImageListItem>
            ))}
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
