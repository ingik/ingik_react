import axios from 'axios'
import React, { useEffect, useState } from 'react'

function RecommandLength(props) {

    const [Length, setLength] = useState("")
    // const [RecommandState,setRecommandState] = useState(false)
    console.log('RecommandLength')
    console.log(props)
    

    useEffect(()=>{

        let ComponentMounted = true;
        if (props.boardId) {
          axios
            .get("/api/boards/recommandLength/" + props.boardId)
            .then((response) => {
              if (ComponentMounted) {
                console.log(response.data[0].recommand.length);
                setLength(response.data[0].recommand.length);
              }
            });
        }
        

        return () => ComponentMounted = false
    },[props,Length])

    return (
        <React.Fragment>
            <div style={{display:'inline-block',verticalAlign:'middle'}}> {Length}</div>
        </React.Fragment>
    )

   
}

export default React.memo(RecommandLength)