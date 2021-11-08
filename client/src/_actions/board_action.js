import axios from "axios"


export function createBoard(dataToSubmit){

    const request = axios.post('/api/boards/create', dataToSubmit)
    .then(response => response.data)

    return{
        type: "create_board",
        payload: request
    }
}

