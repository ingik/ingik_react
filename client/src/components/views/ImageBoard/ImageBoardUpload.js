import { ImageListItem,ImageList } from '@mui/material';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import { shallowEqual, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import  { TextField , Button } from '@mui/material'
import Modal from '@mui/material/Modal';


function ImageBoardUpload(props) {
  const userData = useSelector((state) => state.user.userData, shallowEqual);

  //preview image
  const [ImageListValue, setImageListValue] = useState([]);
  const [ImageArr, setImageArr] = useState("");
  const [PreviewArr, setPreviewArr] = useState([]);
  const [Content, setContent] = useState("");

  const mounted = useRef(false)


  const ImageUploads = (event) => {
    event.preventDefault();

    console.log('imageUPload')

    if (event.target.files) {
      console.log("files : " + event.target.files);
      setImageArr(Array.from(event.target.files));
      setPreviewArr(Array.from(event.target.files));
    }

    let ArrayArr = Array.from(event.target.files)


    let value = []

    ArrayArr.map((list) => {
      const reader = new FileReader();
      reader.readAsDataURL(list);
      reader.onload = function (event) {
        value.push(event.target.result);
      };
    });

    console.log(value)
    setImageListValue(value)

  };


  

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const Data = new FormData();

    console.log(ImageArr);
    
    
    Data.append("userName", userData.name);
    ImageArr.map((imageArr) => {
      Data.append("ImageArr", imageArr);
      console.log(Data.get("ImageArr"));
    });
    
      console.log(Data.getAll('ImageArr'));
      
      // for (let i = 0; i < ImageArr.length; i++) {
      //   console.log(ImageArr[i])
      //   Data.append("ImageArr", ImageArr[i]);
      // }


    console.log(Data.get("ImageArr"));
    console.log("Data.name : " + Data.get("userName"));

    axios
      .post("/api/boards/imageBoardUpload", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        
        let data = [];
        console.log(response.data)

        response.data.map((list) => {
          let value = {
            key : list.key,
            img : list.location
          }
          data.push(value);
        });

        console.log(data);
        console.log("imageUpload");

        let body = {
          user: userData._id,
          content: Content,
          image: data,
        };

        console.log(body);

        axios.post("/api/boards/imageBoardCreate", body).then((response) => {
          console.log(response.data);
        });
      });
  };

  const onContentHander = (event) => {
    setContent(event.target.value);
  };

  return (
    <div
    // style={{
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    //   width: "100%",
    //   height: "100vh",
    // }}
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
        <ImageList sx={{}} cols={3} rowHeight={150} variant="masonry">
          {/* {ImageListValue.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={item}
                alt="a"
                loading="lazy"
                style={{ width: 150, height: 150 }}
              />
            </ImageListItem>
          ))} */}
          {ImageListValue &&
            ImageListValue.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={item}
                  alt="a"
                  loading="lazy"
                  style={{ width: 150, height: 150 }}
                />
              </ImageListItem>
            ))}
        </ImageList>

        <TextField
          type="text"
          value={Content}
          onChange={onContentHander}
          multiline
        />
        <Button variant="outlined" onClick={onSubmitHandler}>
          버튼
        </Button>
      </form>
    </div>
  );
}

export default withRouter(ImageBoardUpload);
