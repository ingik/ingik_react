import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import  { TextField , Button , Snackbar , Alert } from '@mui/material';

function LoginPage(props) {

    const dispatch = useDispatch();

const [Email, setEmail] = useState("")
const [Password, setPassword] = useState("")
const [LoginError, setLoginError] = useState(false)

const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
}

const onPasswordHander = (event) => {
    setPassword(event.currentTarget.value)
}

const onRegister = (event) => {
    props.history.push('/register')
}

const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
        email: Email,
        password: Password
    }

    dispatch(loginUser(body))

        .then(response => {
            setEmail("")
            setPassword("")

            if(response.payload.loginSuccess){
                props.history.push('/')
            } else {
                setLoginError(true)
            }
        })

}

const handleClose = () => {
    
    setLoginError(false)
}




    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100vh'}}>
            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >

            <TextField  
                label="email" 
                variant="outlined" 
                type="email" 
                value={Email} 
                onChange={onEmailHandler} 
                size='small'
                style={{marginBottom:'10px' , width:'250x'}}
            />

            <TextField 
                label="password" 
                variant="outlined" 
                type="password" 
                value={Password} 
                size='small'
                onChange={onPasswordHander} 
                style={{marginBottom:'10px' , width:'250x'}}
            />

            <br/>
                <Button variant='outlined' type="submit" style={{marginBottom:'10px'}}>Login</Button>
                <Button variant='contained' onClick={ onRegister }>Register</Button>
            </form>
            </div>
            <Snackbar
            open={LoginError}
            autoHideDuration={6000}
            onClose={handleClose}
            // anchorOrigin={{ horizontal, vertical }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Incorrect Login
            </Alert>
          </Snackbar>
        </div>
    )
}

export default withRouter(LoginPage)
