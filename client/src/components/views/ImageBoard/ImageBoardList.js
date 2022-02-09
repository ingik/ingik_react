import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

function ImageBoardList(props) {

  const [PreviewList,setPreviewList] = useState([])


  useEffect(() => {
    axios.get('/api/boards/imageBoardList').then(response => {
      console.log(response.data)

      const value = []

      response.data.map((list) => {
        // console.log(list._id)
  
        list.image[0]._id = list._id
        value.push(list.image[0])

        console.log(value)
      })

      setPreviewList(value)
      console.log('value : '+value)
      
    })
    
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

  return (
    <div 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      // height: "100vh",
      marginTop:'5vh'
    }}>
      <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
      {PreviewList.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
            onClick={ function(){
                props.history.push('/imageBoard/'+item._id)
            }}
            onMouseEnter={ onHoverHandler }
            onMouseLeave={ onLeaveHandler }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

export default withRouter(ImageBoardList);
