import { Avatar, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Following from '../../../moduls/Following'
import UnFollowing from '../../../moduls/UnFollowing'
import ProfileImageBoardList from './ProfileImageBoardList'

function OtherProfileCmp(props) {

    console.log(props)

    const userData = useSelector(state => state.user.userData)
    const [UserData, setUserData] = useState({})
    const [FollowDisplay, setFollowDisplay] = useState()
    const [UpdateFollow, setUpdateFollow] = useState()


    useEffect(() => {
        axios.get('/api/users/findId/'+props.match.params.key).then(response => {
            console.log(response.data)
            setUserData(response.data)
        })
    },[props.match.params.key])

    useEffect(() => {

      setUpdateFollow(false)

      let body = {
        followerId: UserData?._id,
        followingId: userData?._id
      }

      console.log(body)

      axios.post('/api/users/followCheck',body).then(response => {
        console.log(response.data)
        if(!response.data){
          setFollowDisplay(false)
        }else{
          setFollowDisplay(true)
        }

      })


    },[UserData,UpdateFollow])



    const onFollowHandler = () => {
      let test = Following(UserData?._id,userData?._id) 
      setUpdateFollow(test)
    }

    const onUnFollowHanler = () => {
      let test = UnFollowing(UserData?._id,userData?._id) 
      setUpdateFollow(test)
    }

    const FollowFunc = () => {
      if (FollowDisplay === false) {
        return <Button onClick={onFollowHandler}>follow</Button>;
      } else {
        return <Button onClick={onUnFollowHanler}>Unfollow</Button>;
      }
    }

   

  return (
    <div>
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
            }}
          >
            <div>{UserData?.name}</div>
            <div>{UserData?.email}</div>
            <div>{UserData?.intro}</div>
          </div>
          { FollowFunc() }
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {/* ProfileUpdate Component */}
        </div>
      </div>

      <div>
        <ProfileImageBoardList ParamsUserId={props.match.params.key} />
      </div>
    </div>
  );
}

export default OtherProfileCmp