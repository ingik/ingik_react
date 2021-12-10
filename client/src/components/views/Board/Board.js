import React,{ useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { boardDetail, deleteBoard } from '../../../_actions/board_action';

function Board(props) {

    const dispatch = useDispatch();
    const [Data,setData] = useState([]);

    console.log( 'board.props(json) : '+JSON.stringify(props));

    let body = {
        id : props.match.params.key
    }

    
    console.log('id : '+ JSON.stringify(body))



    useEffect(() => {
        dispatch(boardDetail(body)).then(response => {
            console.log('(Board)response.payload : '+JSON.stringify(response.payload))
            if(!response.payload){
                console.log('response.payload error')
            }else{
                setData(response.payload)
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const onUpdateHandler = () => {
        console.log('update ID : '+JSON.stringify(Data[0].username))
        console.log('current ID : '+props.response)
        props.history.push('/boards/detail/'+props.match.params.key+'/update')
    }

    const removeHandler = () => {
        dispatch(deleteBoard(body)).then(response => {
            console.log('response.remove : '+ JSON.stringify(response.payload))
            if(response.payload){
                if(response.payload.n === 0){
                    return alert('일치하지 않는 사용자 입니다.')
                }
                alert('delete Board Complate')
                props.history.push('/boards')
            }else{
                console.log('response.payload error')
            }


        })        
    }
    
    console.log(Data)

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100vh'}}>
            <div>   
                <div><h2>prototype</h2></div>
            <table border="1">
                <thead>
    <tr>
        <th>name</th>
        <th>title</th>
        <th>content</th>
        <th>viewcount</th>
        <th>createAt</th>
    </tr>
        </thead>
        <tbody>
    <tr>
        <th>{Data[0]?.username}</th>
        <th>{Data[0]?.title}</th>
        <th>{Data[0]?.content}</th>
        <th>{Data[0]?.veiwCount}</th>
        <th>{Data[0]?.createAt}</th>
    </tr>
    </tbody>
</table>
<button onClick = {onUpdateHandler}>수정</button>
<button onClick = { removeHandler }>삭제</button>


            
            </div>
        </div>
    )
}

export default withRouter(Board)
