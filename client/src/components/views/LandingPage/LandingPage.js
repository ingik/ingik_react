import React,{ useEffect,useState } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import  { Card , CardMedia , CardContent , Typography , Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { auth } from '../../../_actions/user_action';

function LandingPage(props) {
    
    
    const dispatch = useDispatch()
    
    const [IsAuth,setIsAuth] = useState(Boolean)
    
    useEffect(() => {

        dispatch(auth()).then(response => {
            console.log(response)
            
            setIsAuth(response.payload.isAuth)
        })
    }, [])
    
    function visibleLogout (){
        console.log('(Landing)IsAuth : '+JSON.stringify(IsAuth))
        if(IsAuth === false){
            return <div style = {{display:'none'}}> 
                        <Button onClick={onClickHandler}>LOG OUT</Button>
                    </div>
            
        }else if(IsAuth === true){
            return <div style = {{display:'block'}}>
                        <Button onClick={onClickHandler}>LOG OUT</Button>
                    </div>
        }
    }
    
    
    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                console.log(response.data)
                if(response.data.success) {
                    props.history.push('/login')
                } else {
                    alert('로그아웃 실패')
                }
            })
    }


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
        <Card sx={{ Width: "20%", Height: "20%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Board
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ Width: "20%", Height: "20%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Open Chat
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: "20%", maxHeight: "20%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ Width: "20%", Height: "20%" }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              
            </Typography>
          </CardContent>
        </Card>
        { visibleLogout() }
      </div>
    );
}

export default withRouter(LandingPage)
