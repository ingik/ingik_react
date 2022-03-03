import axios from 'axios'
import React, { useEffect, useState } from 'react'

function RecommandLength(props) {

    const [Length, setLength] = useState("")
    const [RecommandState,setRecommandState] = useState(false)
    console.log('RecommandLength')
    console.log(props)
    

    useEffect(()=>{
        setRecommandState(props.RecommandState)

        if(props.boardId){
        axios.get("/api/boards/recommandLength/" + props.boardId).then((response) => {
            console.log(response.data[0].recommand.length);
            setLength(response.data[0].recommand.length)

          });
        }
    },[props,Length,RecommandState])

    return (
        <React.Fragment>
            <div style={{display:'inline-block'}}> {Length}</div>
        </React.Fragment>
    )

   
}

export default RecommandLength