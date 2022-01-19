import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
// import  { Card , CardMedia , CardContent , Typography , Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';

function LandingPage(props) {
    
    
    // const dispatch = useDispatch()
    
    // const [IsAuth,setIsAuth] = useState(Boolean)
    console.log('(landingPage)props : '+JSON.stringify(props))
    
    // useEffect(() => {
    //     dispatch(auth()).then(response => {
    //         console.log(response)
            
    //         setIsAuth(response.payload.isAuth)
    //     })
    // }, [])
    
    
    
    
    


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
       
      </div>
    );
}

export default withRouter(LandingPage)
