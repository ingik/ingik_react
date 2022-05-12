import { Avatar } from '@mui/material'
import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FollowerLength from '../../../moduls/FollowerLength'
import FollowingCmp from '../../../moduls/FollowingCmp'
import FollowLength from '../../../moduls/FollowLength'
import ImageBoardLength from '../../../moduls/ImageBoardLength'
import FollowerList from './FollowerList'
import FollowList from './FollowList'
import ProfileImageBoardList from './ProfileImageBoardList'

function OtherProfileCmp(props) {


    console.log(props)

    const userData = useSelector(state => state.user.userData)
    const [UserData, setUserData] = useState({})
    const [CallData,setCallData] = useState(0)

    const [ModalOpen,setModalOpen] = useState(false)
    const [FollowerModalOpen,setFollowerModalOpen] = useState(false)


    useEffect(() => {
        axios.get('/api/users/findId/'+props.match.params.key).then(response => {
            console.log(response.data)
            setUserData(response.data)
        })
    },[props.match.params.key])


    const getFunc = (data) => {
      setCallData(data)
    }

    const FollowHandler = () => {
      setModalOpen(true)
    }
  
    const FollowerHandler = () => {
      setFollowerModalOpen(true)
    }
    
    const onModalClose = (data) => {
      setModalOpen(data)
      setFollowerModalOpen(data)
    }
    
 

  return (
    <div
      style={{ paddingTop: "64px", height: "90vh", overflowY: "auto" }}
      className="bodyScreen"
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Avatar src={UserData?.image} sx={{ width: 150, height: 150 }} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "30px",
              width: "400px",
            }}
          >
            <div
              style={{
                fontSize: "25px",
                marginBottom: "5px",
                display: "inline-block",
              }}
            >
              {UserData?.name}
              <FollowingCmp
                followerId={UserData?._id}
                followingId={userData?._id}
                getFunc={getFunc}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginBottom: "15px",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                  게시물
                </div>
                <div style={{ textAlign: "center" }}>
                  <ImageBoardLength UserId={UserData?._id} />
                </div>
              </div>
              <div onClick={FollowHandler} style={{ cursor: "pointer" }}>
                <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                  팔로워
                </div>
                <div style={{ textAlign: "center" }}>
                  <FollowLength
                    followerId={UserData?._id}
                    CallData={CallData}
                  />
                </div>
              </div>
              <div onClick={FollowerHandler} style={{ cursor: "pointer" }}>
                <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                  팔로우
                </div>
                <div style={{ textAlign: "center" }}>
                  <FollowerLength UserId={UserData?._id} />
                </div>
              </div>
            </div>
            <div style={{ fontSize: "15px", marginBottom: "5px" }}>
              {UserData?.email}
            </div>
            <div style={{ fontSize: "13px", marginBottom: "5px" }}>
              {UserData?.intro}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        ></div>
      </div>

      <div style={{ textAlign: "center" }}>게시물</div>
      <div style={{ overflow: "hidden" }}>
        <ProfileImageBoardList ParamsUserId={props.match.params.key} />
      </div>

      <FollowList
        Open={ModalOpen}
        onModalClose={onModalClose}
        userId={UserData?._id}
      />

      <FollowerList
        Open={FollowerModalOpen}
        onModalClose={onModalClose}
        userId={UserData?._id}
      />
    </div>
  );
}

export default OtherProfileCmp