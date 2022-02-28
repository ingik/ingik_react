import axios from 'axios'
import React from 'react'

function UnRecommand(board,recommand) {
    
    let body = {
        boardId: board,
        recommandId: recommand
    }

    axios.post('/api/boards/unrecommand',body).then(response => {
        console.log(response.data)
    })

    return false
}

export default UnRecommand