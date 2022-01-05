import React,{ useEffect } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import  { Card , CardMedia , CardContent , Typography , Button} from '@mui/material';

function LandingPage(props) {

    useEffect(() => {

        axios.get('/api/hello')
        .then(response => console.log(response))

    }, [])

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
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100vh'}}>
<Card sx={{ maxWidth: '20%', maxHeight:'20%' }}>
      <CardMedia
        component="img"
        height=""
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        
      </CardContent>
    </Card>
            <div>
            <button onClick={onClickHandler}>
                LOG OUT 
            </button>
            </div>
        </div>
    )
}

export default withRouter(LandingPage)
