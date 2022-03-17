import { Box, ImageList, ImageListItem, Modal } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ImageBoard from '../ImageBoard/ImageBoard';

function ProfileImageBoardList(props) {

  
  const [PreviewList,setPreviewList] = useState([])
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [ParamKey, setParamKey] = useState("")

  console.log(props.ParamsUserId)


  useEffect(() => {

    async function get(){
      const result = await axios.get('/api/boards/imageBoard/profileList/'+props.ParamsUserId)
        const value = [];
        
        console.log(result.data)

        result.data?.map((list) => {
          list.image[0]._id = list._id;
          value.push(list.image[0]);
          console.log(value);
        });

        setPreviewList(value);
        console.log("value : " + value);
    }
    get()

    // axios.get('/api/boards/imageBoard/'+props.ParamsUserId).then(response => {
    //   console.log(response.data)
    // })
  },[props.ParamsUserId])
  
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
  width:'1000px',
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
                console.log(item._id)
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
          <ImageBoard paramKey={ParamKey} contentPosition={true}></ImageBoard>
        </Box>
      </Modal>

    </div>
  )
}

export default ProfileImageBoardList