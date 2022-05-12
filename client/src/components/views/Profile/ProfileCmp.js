import { Avatar } from '@mui/material'
import React, {  useState } from 'react'
import { useSelector,shallowEqual, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { auth } from '../../../_actions/user_action'
import ProfileUpdate from './ProfileUpdate'
import ProfileImageBoardList from './ProfileImageBoardList'
import ImageBoardLength from '../../../moduls/ImageBoardLength'
import FollowLength from '../../../moduls/FollowLength'
import FollowerLength from '../../../moduls/FollowerLength'
import FollowList from './FollowList'
import FollowerList from './FollowerList'

import './../ImageBoard/ImageBoard.css'

function ProfileCmp(props) {


  const userData = useSelector(state => state.user.userData,shallowEqual)
  const [ModalOpen,setModalOpen] = useState(false)
  const [FollowerModalOpen,setFollowerModalOpen] = useState(false)
  const dispatch = useDispatch()
  dispatch(auth())

  //profile 최적화 필요

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
            <Avatar src={userData?.image} sx={{ width: 150, height: 150 }} />

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
                {userData?.name}
                <ProfileUpdate user={userData} />
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
                    <ImageBoardLength UserId={userData?._id} />
                  </div>
                </div>
                <div onClick={FollowHandler} style={{ cursor: "pointer" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                    팔로워
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <FollowLength followerId={userData?._id} />
                  </div>
                </div>
                <div onClick={FollowerHandler} style={{ cursor: "pointer" }}>
                  <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                    팔로우
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <FollowerLength UserId={userData?._id} />
                  </div>
                </div>
              </div>
              <div style={{ fontSize: "15px", marginBottom: "5px" }}>
                {userData?.email}
              </div>
              <div style={{ fontSize: "13px", marginBottom: "5px" }}>
                {userData?.intro}
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
          <ProfileImageBoardList ParamsUserId={userData?._id} />
        </div>

        <FollowList
          Open={ModalOpen}
          onModalClose={onModalClose}
          userId={userData?._id}
        />

        <FollowerList
          Open={FollowerModalOpen}
          onModalClose={onModalClose}
          userId={userData?._id}
        />
      </div>
    );
}

export default withRouter(ProfileCmp)
