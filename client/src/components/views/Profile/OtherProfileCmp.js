import { Avatar, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FollowerLength from '../../../moduls/FollowerLength'
import FollowingCmp from '../../../moduls/FollowingCmp'
import FollowLength from '../../../moduls/FollowLength'
import ImageBoardLength from '../../../moduls/ImageBoardLength'
import ProfileImageBoardList from './ProfileImageBoardList'

function OtherProfileCmp(props) {

    console.log(props)

    const userData = useSelector(state => state.user.userData)
    const [UserData, setUserData] = useState({})
    const [CallData,setCallData] = useState(0)


    useEffect(() => {
        axios.get('/api/users/findId/'+props.match.params.key).then(response => {
            console.log(response.data)
            setUserData(response.data)
        })
    },[props.match.params.key])

   
 

  return (
    <div style={{ paddingTop: "64px" }}>
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
              />
            </div>
            <div style={{display:'flex',justifyContent:'space-evenly',marginBottom:'15px'}}>
              <div>
                <div style={{fontSize:'13px',fontWeight:'bold'}}>게시물</div>
                <div style={{textAlign:'center'}}><ImageBoardLength UserId={UserData?._id} /></div>
              </div>
              <div>
                <div style={{fontSize:'13px',fontWeight:'bold'}}>팔로워</div>
                <div style={{textAlign:'center'}}><FollowLength followerId={UserData?._id}/></div>
              </div>
              <div>
                <div style={{fontSize:'13px',fontWeight:'bold'}}>팔로우</div>
                <div style={{textAlign:'center'}}><FollowerLength UserId={UserData?._id}/></div>
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
        >
        </div>
      </div>

      <div style={{ textAlign: "center" }}>게시물</div>
      <div>
        <ProfileImageBoardList ParamsUserId={props.match.params.key} />
      </div>
    </div>
  );
}

export default OtherProfileCmp