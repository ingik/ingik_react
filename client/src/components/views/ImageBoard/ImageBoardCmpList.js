import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ImageBoard from './ImageBoard';

function ImageBoardCmpList() {


  const [DataList, setDataList] = useState([])


  useEffect(() => {
    async function get() {
      const result = await axios.get("/api/boards/imageBoardList");
      const value = [];

      console.log(result)

      result?.data.map((list) => {

        console.log(list)

        axios.get('/api/boards/recommandLength/'+list._id).then(response => {
          console.log(response.data)
          list.recommand = response.data[0]?.recommand
        })
        
        value.push(list);
    
      });

      setDataList(value)
      console.log(value)

    }

    get()
  },[])


    
  return (
  <div style={{paddingTop:'64px'}}>
    {DataList.map((item) => {
      return (
        <div key={item._id}
          style={{
            width:'500px',
            marginLeft:'calc(50% - 250px)',
            marginTop:'20px'
          }}
        >
        <ImageBoard paramKey={item._id} contentPosition={false} />
        </div>
      )
    })}
  </div>
  );
}

export default withRouter(ImageBoardCmpList);
