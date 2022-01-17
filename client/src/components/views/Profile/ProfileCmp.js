import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { auth } from '../../../_actions/user_action'
import ProfileUpdate from './ProfileUpdate'

function ProfileCmp(props) {


    console.log('(ProfileCmp)props : '+ JSON.stringify(props))
    const dispatch = useDispatch()
    
    const [User,setUser] = useState({})
    
    useEffect(() => {
        dispatch(auth()).then(response => {
            
            console.log('(ProfileCmp)auth : '+JSON.stringify(response.payload))
            
            setUser(response.payload)
        })
    }, [dispatch])
    
    // console.log('(ProfileCmp)User : '+ JSON.stringify(User))
    


    return (
      <div>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center',marginTop:'20px'}}>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 150, height: 150 }}
          />
          <div style={{ display: "flex", flexDirection: "column", marginLeft:'30px' }}>
            <div>{User.name}</div>
            <div>{User.email}</div>
            <div>Intro : </div>
                <div> {User.intro}asdfasdfasd</div>
          </div>

        </div>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center',marginTop:'20px'}}>
            {/* <Button variant='outlined'>Profile Update</Button> */}
            <ProfileUpdate/>
        </div>
      </div>
    );
}

export default withRouter(ProfileCmp)
