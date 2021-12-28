import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link,withRouter } from 'react-router-dom'
import { boardList } from '../../../_actions/board_action'


function BoardList(props) {

    const dispatch = useDispatch()
    const [Data,setData] = useState([])


    useEffect(() => {
        dispatch(boardList()).then( response => { 
            // console.log('response.payload : '+ JSON.stringify(response.payload))
            if(response.payload){
                setData(response.payload)
            } else {
                alert("Failed to boardList")
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    const List = Data.map((data) =>{

        const url = data._id
        return <div key={data._id}>
                <div><Link to={'/boards/detail/'+url}>{data.title}</Link></div>
            </div>
    })

    const  onClickHandler = () => {
        props.history.push('/createboard')
    }

       
    return (
        <div>
            <div><button onClick = { onClickHandler }>Create</button></div>
            { List }
        </div>
    )
}

export default withRouter(BoardList);