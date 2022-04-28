import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import Recommand from './Recommand'
import UnRecommand from './UnRecommand'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecommandLength from './RecommandLength'

function RecommandCmp(props) {

    const [RecommandDisplay, setRecommandDisplay] = useState(false)
    const [RecommandUpdate, setRecommandUpdate] = useState(null)
    
    useEffect(() => {
        
      console.log('RecommandCmp')

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
    
      },[props])
    
    const onRecommandHandler = () => {
      console.log('click')
      async function update(){
        await setRecommandDisplay(Recommand(props.boardId, props.recommandId)) 
        setRecommandUpdate(true)
      } 
      update()
    }
    
    const onUnRecommandHanler = () => {
        console.log('Unclick')
        async function update(){
          await setRecommandDisplay(UnRecommand(props.boardId, props.recommandId)) 
          setRecommandUpdate(false)
        }
        update()
    }

    const RecommandFunc = () => {
        if (RecommandDisplay === false) {
          return <FavoriteBorderIcon style={{verticalAlign:'middle'}} onClick={onRecommandHandler}></FavoriteBorderIcon>;
        } else {
          return <FavoriteIcon style={{verticalAlign:'middle'}} onClick={onUnRecommandHanler}></FavoriteIcon>;
        }
      }

  return (
    <React.Fragment>
        { RecommandFunc() }
        <div style={{verticalAlign:'middle',display:'inline-block', margin:'0 3px 0 5px'}}>좋아요</div>
        <RecommandLength boardId={props.boardId} RecDisplay={RecommandUpdate}/>
    </React.Fragment>
  )
}

export default React.memo(RecommandCmp)