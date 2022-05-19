import axios from "axios";

function Recommand(boardUser, board, recommand) {
  let body = {
    boardUserId: boardUser,
    boardId: board,
    recommandId: recommand,
  };

  axios.post("/api/boards/recommand", body).then((response) => {
    console.log(response.data);
  });

  return true;
}

export default Recommand;
