import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ImageBoard from './ImageBoard'


function ImageBoardList(props) {

  const [PreviewList,setPreviewList] = useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ParamKey, setParamKey] = useState("")


  useEffect(() => {

    async function get(){
      const result = await axios.get("/api/boards/imageBoardList")
        const value = [];

        result.data?.map((list) => {
          list.image[0]._id = list._id;
          value.push(list.image[0]);
          console.log(value);
        });

        setPreviewList(value);
        console.log("value : " + value);
    }
    get()
    
    // axios.get('/api/boards/imageBoardList').then(response => {
    //   console.log(response.data)
    //   const value = []
    //   response.data?.map((list) => {
    //     // console.log(list._id)
  
    //     list.image[0]._id = list._id
    //     value.push(list.image[0])

    //     console.log(value)
    //   })

    //   setPreviewList(value)
    //   console.log('value : '+value)
      
    // })
    
  },[])
  
  useEffect(() => {
    console.log("PreviewList : " + JSON.stringify(PreviewList));
  },[PreviewList])

  const onHoverHandler = (event) => {
    event.target.style =`opacity:0.5`
  }

  const onLeaveHandler = (event) => {
    event.target.style =`opacity:1`
  }
  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width:'90%',
  height:'500px',
  boxShadow: 24,
  p: 4,
  padding:'0'
};

  

  return (
    <div>
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
              // function(){props.history.push('/imageBoard/'+item._id) }
              function(){  
                setOpen(true)
                setParamKey(item._id)
               }

            }
            onMouseEnter={ onHoverHandler }
            onMouseLeave={ onLeaveHandler }
          />
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
          <ImageBoard paramKey={ParamKey}></ImageBoard>
        </Box>
      </Modal>

    </div>
  );
}

export default withRouter(ImageBoardList);
