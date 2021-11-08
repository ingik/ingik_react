import React,{ useState } from 'react'
import { registUser } from '../../../_actions/user_action'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

function RegisterPage(props) {

    const dispatch = useDispatch();
    
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHander = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHander = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHander = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호가 맞지 않습니다.');
        }

    
        let body = {
            name: Name,
            email: Email,
            password: Password

        }
    
        dispatch(registUser(body))
            .then(response => {
                if(response.payload.registerData){
                    props.history.push("/login")
                }else{
                    alert("Failed to regist")
                }
                
            })
    
    }


    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100vh'}}>
            

            <form style={{display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
            

            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />

            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHander} />

            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHander} />

            <label>ConfirmPassword</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHander} />


            <br/>
            <button type="submit">회원가입</button>

            </form>
        </div>
    )
}

export default withRouter(RegisterPage)