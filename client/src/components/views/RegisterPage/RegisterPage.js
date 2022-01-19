import React,{ useState } from 'react'
import { registUser } from '../../../_actions/user_action'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import  { TextField , Button , Alert , Snackbar} from '@mui/material'
import axios from 'axios'

function RegisterPage(props) {

    const dispatch = useDispatch();
    
    const [Name, setName] = useState("")
    const [Usable, setUsable] = useState(false)
    const [UnUsable, setUnUsable] = useState(false)
    const [UnSubmit, setUnSubmit] = useState(false)
    const [UnEmail, setUnEmail] = useState(false)
    const [UnName, setUnName] = useState(false)

    const [Email, setEmail] = useState("")
    const [EmailAlert,setEamilAlert] = useState("")
    const [EmailAlertError,setEmailAlertError] = useState(true)

    const [Password, setPassword] = useState("")
    const [PasswordAlert, setPasswordAlert] = useState("")
    const [PasswordAlertError, setPasswordAlertError] = useState(true)

    const [ConfirmPassword, setConfirmPassword] = useState("")
    const [ConfirmPasswordAlert, setConfirmPasswordAlert] = useState("")
    const [ConfirmPasswordAlertError, setConfirmPasswordAlertError] = useState(true)

    const onEmailHandler = (event) => {
        
        const emailRegex = /([a-zA-Z+]|([0-9]))@([a-zA-Z+]|([0-9]))+[.]+([a-zA-Z+]|([0-9]))+/
        // const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        if(!event.currentTarget.value){

            console.log("empty")
            setEmail(event.currentTarget.value)
            setEamilAlert(false)
            setEmailAlertError(true)

        }else if(!emailRegex.test(event.currentTarget.value)){

            console.log('emailRegex')
            setEmail(event.currentTarget.value)
            setEamilAlert("Email format is incorrect.")
            setEmailAlertError(false)

        }else{

            setEmail(event.currentTarget.value)
            setEamilAlert("Email format is correct.")
            setEmailAlertError(true)
            
        }
        
    }

    const onNameHander = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHander = (event) => {

        const passwordRegex =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/

        // setPassword(event.currentTarget.value)

        if(!event.currentTarget.value){

            console.log("empty")
            setPassword(event.currentTarget.value)
            setPasswordAlert(false)
            setPasswordAlertError(true)

        }else if(!passwordRegex.test(event.currentTarget.value)){

            console.log('emailRegex')
            setPassword(event.currentTarget.value)
            setPasswordAlert("Password format is incorrect.")
            setPasswordAlertError(false)

        }else{

            setPassword(event.currentTarget.value)
            setPasswordAlert(false)
            setPasswordAlertError(true)
            
        }
    }

    const onConfirmPasswordHander = (event) => {
      
        if(!event.currentTarget.value){

            setConfirmPassword(event.currentTarget.value)
            setConfirmPasswordAlert(false)
            setConfirmPasswordAlertError(true)

        }else if(event.currentTarget.value !== Password){

            setConfirmPassword(event.currentTarget.value)
            setConfirmPasswordAlert("Password is incorrect")
            setConfirmPasswordAlertError(false)
        }else {

            setConfirmPassword(event.currentTarget.value)
            setConfirmPasswordAlert(false)
            setConfirmPasswordAlertError(true)

        }
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        if(!Name && !Email && !Password && !ConfirmPassword){
          
          setUnSubmit(true)
        } else {
          if (Password !== ConfirmPassword) {
            return alert("비밀번호가 맞지 않습니다.");
          }

          let body = {
            name: Name,
            email: Email,
            password: Password,
          };

          // axios.post('/api/users/findEmail')

          dispatch(registUser(body)).then((response) => {
            console.log(response);
            if (response.payload.success === true) {
              console.log("(Register)dispatch");
              props.history.push("/login");
            } else if(response.payload.emailcheck === false) {
              setUnEmail(true)
            } else if(response.payload.namecheck === false){
              setUnName(true)
            }
          });
        }
    
    }

    const onBack = () => {
        console.log("Back")
        props.history.push('/')
    }

    const onNameCheck = () => {

      let body = {
        username : Name
      }

      axios.post('/api/users/find', body).then((response) => {
        if(response.data) {
          setUsable(true)
        }else{
          setUnUsable(true)
        }
      })

    }

    const handleClose = () => {
      
      setUsable(false)
      setUnUsable(false)
      setUnSubmit(false)
      setUnEmail(false)
      setUnName(false)
    };

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
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmitHandler}
        >
          <TextField
            error={EmailAlertError ? false : true}
            label="email"
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px", width: "250x" }}
            type="email"
            value={Email}
            onChange={onEmailHandler}
            helperText={EmailAlert}
          />
          <div>
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              style={{
                marginBottom: "10px",
                width: "250x",
                marginRight: "5px",
              }}
              type="text"
              value={Name}
              onChange={onNameHander}
            />
            <Button
              variant="outlined"
              style={{ width: "40px", marginTop: "1.75px" }}
              onClick={onNameCheck}
              type="button"
            >
              Check
            </Button>
          </div>
          <TextField
            error={PasswordAlertError ? false : true}
            label="password"
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px", width: "250x" }}
            type="password"
            value={Password}
            onChange={onPasswordHander}
            helperText={PasswordAlert}
          />
          {/* <div>영어, 숫자 및 특수문자 혼용 8글자 이상</div> */}
          <TextField
            error={ConfirmPasswordAlertError ? false : true}
            label="ConfirmPassword"
            variant="outlined"
            size="small"
            style={{ marginBottom: "10px", width: "250x" }}
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHander}
            helperText={ConfirmPasswordAlert}
          />

          <br />
          <Button
            variant="outlined"
            style={{ marginBottom: "10px" }}
            type="submit"
          >
            Register
          </Button>
          <Button variant="contained" onClick={onBack} type="button">
            Back
          </Button>

          <Snackbar 
            open={UnUsable} 
            autoHideDuration={6000} 
            onClose={handleClose}>
            {/* anchorOrigin={{ vertical:'bottom', horizontal:'center'}} */}
            

            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Usable ID!
            </Alert>
          </Snackbar>

          <Snackbar
            open={Usable}
            autoHideDuration={6000}
            onClose={handleClose}
            // anchorOrigin={{ horizontal, vertical }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              UnUsable ID
            </Alert>
          </Snackbar>

          <Snackbar
            open={UnSubmit}
            autoHideDuration={6000}
            onClose={handleClose}
            // anchorOrigin={{ horizontal, vertical }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              전부 입력 해주세요.
            </Alert>
          </Snackbar>

          <Snackbar
            open={UnEmail}
            autoHideDuration={6000}
            onClose={handleClose}
            // anchorOrigin={{ horizontal, vertical }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              중복 된 이메일입니다.
            </Alert>
          </Snackbar>

          <Snackbar
            open={UnName}
            autoHideDuration={6000}
            onClose={handleClose}
            // anchorOrigin={{ horizontal, vertical }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              중복 된 이름입니다.
            </Alert>
          </Snackbar>
        </form>
      </div>
    );
}

export default withRouter(RegisterPage)