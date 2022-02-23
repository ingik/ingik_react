import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function OtherProfileCmp(props) {

    console.log(props)

    const [UserData, setUserData] = useState({})

    useEffect(()=>{
        axios.get('/api/users/findId/'+props.match.params.key).then(response => {
            console.log(response.data)
            setUserData(response.data)
        })
    },[props.match.params.key])

  return (
    <div>
        <div>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center',marginTop:'20px'}}>
          <Avatar
            src={UserData?.image}
            sx={{ width: 150, height: 150 }}
          />

          <div style={{ display: "flex", flexDirection: "column", marginLeft:'30px' }}>
            <div>{UserData?.name}</div>
            <div>{UserData?.email}</div>
            <div>{UserData?.intro}</div>
          </div>

        </div>
        <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center',marginTop:'20px'}}>
          {/* ProfileUpdate Component */}
        </div>
      </div>
    </div>
  )
}

export default OtherProfileCmp