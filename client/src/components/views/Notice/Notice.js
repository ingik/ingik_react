import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function Notice() {

  const LoginUserData = useSelector((state) => state.user.userData)
  const [NoticeList,setNoticeList] = useState(null)

  useEffect(() => {
    console.log(LoginUserData)
  },[LoginUserData])

  return (
    <div style={{paddingTop:'64px'}}>

        {/* {NoticeList && NoticeList.map((index) => {

          return (

          )
        })} */}
        
    </div>
  )
}

export default Notice