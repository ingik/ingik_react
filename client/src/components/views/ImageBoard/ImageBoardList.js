import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

function ImageBoardList(props) {

  const [PreviewList,setPreviewList] = useState([])

  useEffect(() => {
    axios.get('/api/boards/imageBoardList').then(response => {
      console.log('response.data : '+response.data)

      const value = []

      response.data.map((list) => {
        value.push(list.image[0])
        console.log(list.image[0])
      })

      setPreviewList(value)
      console.log('value : '+value)
      
    })
    
  },[])
  
  useEffect(() => {
    console.log("PreviewList : " + JSON.stringify(PreviewList));
  },[PreviewList])

  return (
    <div>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {PreviewList.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.name}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

export default withRouter(ImageBoardList);
