import { ImageListItem,ImageList } from '@mui/material';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import { shallowEqual, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import  { TextField , Button } from '@mui/material'

function ImageBoardUpload(props) {
  const userData = useSelector((state) => state.user.userData, shallowEqual);

  //preview image
  const [ImageListValue, setImageListValue] = useState([]);
  const [ImageArr, setImageArr] = useState("");
  const [PreviewArr, setPreviewArr] = useState([]);
  const [Content, setContent] = useState("");

  const [ImageLocation, setImageLocation] = useState({});

  const mounted = useRef(false)
  const ImageMounted = useRef(false)


  const ImageUploads = (event) => {
    event.preventDefault();

    console.log('imageUPload')

    if (event.target.files) {
      console.log("files : " + event.target.files);
      setImageArr(Array.from(event.target.files));
      // setImageArr(event.target.files);
      setPreviewArr(Array.from(event.target.files));
    }

  };

  useEffect(() => {

    if(!mounted.current){

      mounted.current = true

    }else{
      
      console.log('Preview')
      const value = [];
      console.log(ImageArr);

      PreviewArr.map((list) => {
        const reader = new FileReader();
        reader.readAsDataURL(list);
        reader.onload = function (event) {
          value.push(event.target.result);
          // console.log("value : " + value);
        };
      });

      setImageListValue(value);
    }
  }, [PreviewArr]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const Data = new FormData();

    console.log(ImageArr);

    
    ImageArr.map((imageArr) => {
        Data.append("ImageArr", imageArr);
        console.log(Data.get("ImageArr"));
      });

      console.log(Data.getAll('ImageArr'));
      
      // for (let i = 0; i < ImageArr.length; i++) {
      //   console.log(ImageArr[i])
      //   Data.append("ImageArr", ImageArr[i]);
      // }

      Data.append("userName", userData.name);

    console.log(Data.get("ImageArr"));
    console.log("Data.name : " + Data.get("userName"));

    axios
      .post("/api/boards/imageBoardUpload", Data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log('response.data : '+JSON.stringify(response.data));
        let data = [];
        
        console.log(response.data)
        
        response.data.map((list) => {

          // value.name = list.key;
          // value.img = list.location;

          let value = {
            key : list.key,
            img : list.location
          }

          data.push(value);
        });

        console.log(data);

        setImageLocation(data);

        console.log("imageUpload");

        let body = {
          user: userData,
          content: Content,
          image: data,
        };

        console.log(body);

        axios.post("/api/boards/imageBoardCreate", body).then((response) => {
          console.log(response.data);
        });
      });
  };


  // useEffect(() => {

  //   if (!ImageMounted.current) {

  //     ImageMounted.current = true;

  //   } else {

  //     console.log('imageUpload')
  //     let body = {
  //       user: userData,
  //       content: Content,
  //       image: ImageLocation,
  //     };

  //     console.log(body);

  //     axios.post("/api/boards/imageBoardCreate", body).then((response) => {
  //       console.log(response.data);
  //     });
  //   }
  // }, [ImageArr]);

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
          {ImageListValue.map((item, index) => (
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

        <TextField  type="text" value={Content} onChange={onContentHander} multiline/>
        <Button variant='outlined' onClick={ onSubmitHandler }>버튼</Button>
      </form>
    </div>
  );
}

export default withRouter(ImageBoardUpload);
