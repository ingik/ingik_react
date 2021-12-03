import React,{ useEffect,useState } from 'react'
import { useDispatch } from 'react-redux'
import { boardDetail } from '../../../_actions/board_action';

function Board(props) {

    const dispatch = useDispatch();
    const [Data,setData] = useState([]);

    console.log( 'props(json) : '+JSON.stringify(props));
    console.dir( 'props : '+props);
    


    let body = {
        id : props.match.params.key
    }

    
    console.log('id : '+ JSON.stringify(body))



    useEffect(() => {
        dispatch(boardDetail(body)).then(response => {
            console.log('response : '+JSON.stringify(response.payload))
            if(response.payload){
                setData(response.payload)
            }else{
                console.log('response.payload error')
            }
        })
    }, [])
    
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
        <th>viewcount</th>
        <th>updateAt</th>
        <th>createAt</th>
    </tr>
        </thead>
        <tbody>
    <tr>
        <th>{Data[0]?.username}</th>
        <th>{Data[0]?.title}</th>
        <th></th>
        <th></th>
        <th></th>
    </tr>
    </tbody>
</table>


            
            </div>
        </div>
    )
}

export default Board
