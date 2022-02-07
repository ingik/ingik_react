import { ImageListItem,ImageList } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { shallowEqual, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

function ImageBoardUpload(props) {

  const userData = useSelector(state => state.user.userData,shallowEqual)
  console.log(userData)

  //preview image
  const [ImageListValue, setImageListValue] = useState([]);
  const [ImageArr, setImageArr] = useState([])
  const [Content, setContent] = useState("");


  const [ImageLocation, setImageLocation] = useState({})

  const ImageUploads = (event) => {
    event.preventDefault();

    if (event.target.files) {
      setImageArr(Array.from(event.target.files))
      // const ImageArr = Array.from(event.target.files);
      console.log("files : " + event.target.files);
      console.log("ImageArr : " + ImageArr);

      const value = [];

      ImageArr.map((list) => {
        const reader = new FileReader();
        reader.readAsDataURL(list);
        reader.onload = function (event) {
          value.push(event.target.result);
          console.log("result : " + event.target.result);
        };
      });

      setImageListValue(value);
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const Data = new FormData();

    console.log('ImageArr : '+ImageArr)

    
    Data.append("userName" , userData.name)
    ImageArr.map((imageArr) => {
      Data.append("ImageArr" , imageArr)
      console.log('Data+ : ' + Data.get("ImageArr"))
    })
    
    console.log('Data : ' + Data.get("ImageArr"))
    console.log('Data.name : ' + Data.get("userName"))
    

    axios.post("/api/boards/imageBoardUpload", Data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response.data);
      let value = [];
      response.data.map((list) => {
        value.push(list.location);
      });

      setImageLocation(value);

      let body = {
        user : userData,
        content : Content,
        image : ImageLocation
      }

      console.log('body : '+ JSON.stringify(body))
      console.log('value : '+ JSON.stringify(value))

      axios.post('/api/boards/imageBoardCreate',body).then((response) => {

        console.log(response.data)

      })
      
    });
  };
    
  const onContentHander = (event) => {
    setContent(event.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="input-file">
          <input
            type="file"
            id="input-file"
            accept="image/*"
            onChange={ImageUploads}
            // style={{ display: "none" }}
            multiple
          ></input>
          <div component="span">버튼</div>
        </label>
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
          {ImageListValue.map((item) => (
            <ImageListItem>
              <img
                src={item}
                alt="a"
                loading="lazy"
                style={{ width: 150, height: 150 }}
              />
            </ImageListItem>
          ))}
        </ImageList>

        <input type="text" value={Content} onChange={onContentHander} />
        <button>버튼</button>
      </form>
    </div>
  );
}

export default withRouter(ImageBoardUpload);
