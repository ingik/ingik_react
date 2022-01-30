import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector,shallowEqual, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { auth } from '../../../_actions/user_action'
import ProfileUpdate from './ProfileUpdate'

function ProfileCmp(props) {
  const userData = useSelector(state => state.user.userData,shallowEqual)


    console.log('(ProfileCmp)userData : '+ JSON.stringify(userData))
    // const dispatch = useDispatch()
    const [User, setUser] =useState({})

    

    
    const dispatch = useDispatch()

    dispatch(auth())

    useEffect(() => {
      // setUser(userData)
      console.log('(ProfileCmp)User : '+JSON.stringify(User))
      console.log('(ProfileCmp)UserSelector : '+JSON.stringify(userData))
    
    }, [])

    
    return (
      <div>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center',marginTop:'20px'}}>
          <Avatar
            src={userData?.image}
            sx={{ width: 150, height: 150 }}
          />
          <div style={{ display: "flex", flexDirection: "column", marginLeft:'30px' }}>
            <div>{userData?.name}</div>
            <div>{userData?.email}</div>
            <div>{userData?.intro}</div>
          </div>

        </div>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center',marginTop:'20px'}}>
          {/* ProfileUpdate Component */}
            <ProfileUpdate user={userData}/>
        </div>
      </div>
    );
}

export default withRouter(ProfileCmp)
