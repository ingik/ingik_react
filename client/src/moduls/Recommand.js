import axios from 'axios'

function Recommand(board,recommand) {

    let body = {
        boardId: board,
        recommandId: recommand
    }

    axios.post('/api/boards/recommand',body).then(response => {
        console.log(response.data)
    })

    return true
}

export default Recommand