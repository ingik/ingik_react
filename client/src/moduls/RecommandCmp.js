import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Recommand from './Recommand'
import UnRecommand from './UnRecommand'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function RecommandCmp(props) {

    const [RecommandDisplay, setRecommandDisplay] = useState(false)
    
    useEffect(() => {
        
        let body = {
          boardId: props.boardId,
          recommandId: props.recommandId
        }

        console.log(body)
    
        axios.post('/api/boards/recommandCheck',body).then(response => {
          
          console.log(response.data)
    
          if(!response.data){
            setRecommandDisplay(false)
          }else{
            setRecommandDisplay(true)
          }
    
        })
    
      },[props.recommandId,RecommandDisplay])
    
    const onRecommandHandler = () => {
        setRecommandDisplay(Recommand(props.boardId, props.recommandId)) 
    }
    
    const onUnRecommandHanler = () => {
        setRecommandDisplay(UnRecommand(props.boardId, props.recommandId)) 
    }

    const RecommandFunc = () => {
        if (RecommandDisplay === false) {
          return <FavoriteBorderIcon onClick={onRecommandHandler}></FavoriteBorderIcon>;
        } else {
          return <FavoriteIcon onClick={onUnRecommandHanler}></FavoriteIcon>;
        }
      }

  return (
    <div>
        { RecommandFunc() }
    </div>
  )
}

export default RecommandCmp