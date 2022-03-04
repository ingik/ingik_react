import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ImageBoardLength(props) {

    const [Length, setLength] = useState()
    useEffect(()=>{
        if(props.UserId)
        axios.get('/api/boards/imageBoard/profileList/' + props.UserId).then(response => {
          console.log(response.data.length);
          setLength(response.data.length)
        })

    },[props.UserId])
  return (
    <React.Fragment>
        {Length}
    </React.Fragment>
  )
}

export default ImageBoardLength