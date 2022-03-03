import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Recommand from './Recommand'
import UnRecommand from './UnRecommand'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecommandLength from './RecommandLength';

function RecommandCmp(props) {

    const [RecommandDisplay, setRecommandDisplay] = useState(false)
    
    console.log(props)
    
    useEffect(() => {
        
      console.log('Recommand')

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
    
      },[props.recommandId,props.boardId,RecommandDisplay])
    
    const onRecommandHandler = () => {
        setRecommandDisplay(Recommand(props.boardId, props.recommandId)) 
        props.getRec(1)
    }
    
    const onUnRecommandHanler = () => {
        setRecommandDisplay(UnRecommand(props.boardId, props.recommandId)) 
        props.getRec(2)
    }

    const RecommandFunc = () => {
        if (RecommandDisplay === false) {
          return <FavoriteBorderIcon onClick={onRecommandHandler}></FavoriteBorderIcon>;
        } else {
          return <FavoriteIcon onClick={onUnRecommandHanler}></FavoriteIcon>;
        }
      }

  return (
    <React.Fragment>
        { RecommandFunc() }
    </React.Fragment>
  )
}

export default RecommandCmp