import axios from 'axios'
import React, {useEffect, useMemo, useState } from 'react'
import Recommand from './Recommand'
import UnRecommand from './UnRecommand'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RecommandLength from './RecommandLength'

function RecommandCmp(props) {
  const [RecommandDisplay, setRecommandDisplay] = useState(false);
  const [RecommandUpdate, setRecommandUpdate] = useState(null);

  const memo_RecommandUpdate = useMemo(
    () => RecommandUpdate,
    [RecommandUpdate]
  );
  // const memoRecommandDisplay = useCallback((data) => setRecommandDisplay(data),[RecommandDisplay])

  const memo_RecommandDisplay = useMemo(
    () => RecommandDisplay,
    [RecommandDisplay]
  );

  useEffect(() => {
    console.log("RecommandCmp");

    let CleanUpBoolean = true;

    let body = {
      boardId: props.boardId,
      recommandId: props.recommandId,
    };

    console.log(body);

    axios.post("/api/boards/recommandCheck", body).then((response) => {
      console.log(response.data);

      if (CleanUpBoolean) {
        if (!response.data) {
          // memoRecommandDisplay(false)
          setRecommandDisplay(false);
        } else {
          // memoRecommandDisplay(true)
          setRecommandDisplay(true);
        }
      }
    });

    return () => {
      CleanUpBoolean = false
    }
  }, [props]);

  const onRecommandHandler = () => {
    console.log("click");
    async function update() {
      await setRecommandDisplay(Recommand(props.boardId, props.recommandId));
      // await memoRecommandDisplay(Recommand(props.boardId, props.recommandId))
      setRecommandUpdate(true)
      // memoRecommandUpdate(true);
    }
    update();
  };

  const onUnRecommandHanler = () => {
    console.log("Unclick");
    async function update() {
      await setRecommandDisplay(UnRecommand(props.boardId, props.recommandId));
      // await memoRecommandDisplay(UnRecommand(props.boardId, props.recommandId))
      setRecommandUpdate(false)
      // memoRecommandUpdate(false);
    }
    update();
  };

  return (
    <React.Fragment>
      {memo_RecommandDisplay ? (
        <FavoriteIcon
          style={{ verticalAlign: "middle" }}
          onClick={onUnRecommandHanler}
        ></FavoriteIcon>
      ) : (
        <FavoriteBorderIcon
          style={{ verticalAlign: "middle" }}
          onClick={onRecommandHandler}
        ></FavoriteBorderIcon>
      )}
      <div
        style={{
          verticalAlign: "middle",
          display: "inline-block",
          margin: "0 3px 0 5px",
        }}
      >
        좋아요
      </div>
      <RecommandLength boardId={props.boardId} RecDisplay={memo_RecommandUpdate} />
    </React.Fragment>
  );
}

export default React.memo(RecommandCmp)