import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ImageBoard from './ImageBoard'


function ImageBoardList(props) {

  const [PreviewList,setPreviewList] = useState([])
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [ParamKey, setParamKey] = useState("")
  const lengthStyle = useRef()


  useEffect(() => {

    async function get() {
      const result = await axios.get("/api/boards/imageBoardList");
      const value = [];

      console.log(result)

      if(result){
        result.data.map((list) => {
          console.log(list);
          list.image[0]._id = list._id;

          axios
            .get("/api/boards/recommandLength/" + list._id)
            .then((response) => {
              console.log(response.data);
              list.image[0].length = response.data[0]?.recommand.length;
            });

          value.push(list.image[0]);
        });
      }

      setPreviewList(value);
      console.log(value);
    }

    get()


    
  },[])
  
  useEffect(() => {
    console.log(PreviewList);
  },[PreviewList])

  const onHoverHandler = (event) => {
    event.target.style=`opacity: 0.3;`
    lengthStyle.current.style=`display:block`
  }
  
  const onLeaveHandler = (event) => {
    event.target.style =`opacity:1;`
    lengthStyle.current.style=`display:none`
  }

  
  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width:'63em',
  height:'500px',
  boxShadow: 24,
  p: 4,
  padding:'0',
  
};

  

  return (
    <div style={{paddingTop:'64px'}}>
    <div 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      // height: "100vh",
      marginTop:'5vh'
    }}>
      <ImageList sx={{ width: '70%', height:'100%' }} cols={3} >
      {PreviewList.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
            onClick={ 
              function(){  
                setOpen(true)
                setParamKey(item._id)
               }

            }
            onMouseEnter={ onHoverHandler }
            onMouseLeave={ onLeaveHandler }
          />
        <div 
          style={{position:'absolute' ,top:'50%',left:'50%',color:'white'}}
          ref={ lengthStyle }
        >
          {item.length}
        </div>
        </ImageListItem >
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
