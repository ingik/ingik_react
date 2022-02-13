import { Avatar } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector,shallowEqual, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { auth } from '../../../_actions/user_action'
import ProfileUpdate from './ProfileUpdate'

function ProfileCmp(props) {


  const userData = useSelector(state => state.user.userData,shallowEqual)

  
  const dispatch = useDispatch()
  dispatch(auth())


  //profile 최적화 필요
  
  


   
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
