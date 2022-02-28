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
  <div>
    {DataList.map((item) => {
      return (
        <div key={item._id}
        >
        <ImageBoard paramKey={item._id} contentPosition={false} />
        </div>
      )
    })}
  </div>
  );
}

export default withRouter(ImageBoardCmpList);
