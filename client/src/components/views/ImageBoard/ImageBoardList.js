import { ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

function ImageBoardList(props) {

  const [PreviewList,setPreviewList] = useState({})


  useEffect(() => {
    axios.get('/api/boards/imageBoardList').then(response => {
      console.log(response.data)

      let value = []

      response.data.map((list) => {
        value.push(list.image[0])
        console.log(list.image[0])
      })

      console.log('value : '+value)
      
      setPreviewList(value)

      console.log('PreviewList : ' + JSON.stringify(PreviewList))

    })

  },[])

  return (
    <div>
      

    </div>
  );
}

export default withRouter(ImageBoardList);
