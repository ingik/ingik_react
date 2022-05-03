import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Following from './Following'
import UnFollowing from './UnFollowing'
import CircularProgress from '@mui/material/CircularProgress';

function FollowingCmp(props) {
  const [FollowDisplay, setFollowDisplay] = useState(null);
  const memoFollowDisplay = useCallback(data => setFollowDisplay(data),[FollowDisplay])
  const [DataCheck, setDataCheck] = useState(false)
  useEffect(() => {
    console.log("FollowCheck");
    
    console.log(props)
    

    let body = {
      followerId: props.followerId,
      followingId: props.followingId,
    };

    console.log(body);

    axios.post("/api/users/followCheck", body).then((response) => {
      console.log(response.data);
      setDataCheck(true)
      if (!response.data) {
        // setFollowDisplay(false);
        memoFollowDisplay(false);
      } else {
        // setFollowDisplay(true);
        memoFollowDisplay(true);
      }
    });
  }, [props.followerId, props.followingId]);

  const onFollowHandler = () => {
    props.getFunc(1)
    // setFollowDisplay(Following(props.followerId, props.followingId));
    memoFollowDisplay(Following(props.followerId, props.followingId));
  };

  const onUnFollowHanler = () => {
    props.getFunc(2)
    // setFollowDisplay(UnFollowing(props.followerId, props.followingId));
    memoFollowDisplay(UnFollowing(props.followerId, props.followingId));
  };

  const FollowFunc = () => {
    if (!FollowDisplay) {
      return (
        <Button
          onClick={onFollowHandler}
          style={{ display: "inline-block", width: "100px",float:'right',fontSize:'12px' }}
          variant="contained"
        >
          follow
        </Button>
      );
    } 

    if(FollowDisplay){
      return (
        <Button
          onClick={onUnFollowHanler}
          style={{ display: "inline-block", width: "100px",float:'right',fontSize:'12px' }}
          variant="outlined"
        >
          Unfollow
        </Button>
      );
    }
  };

  return (
    <React.Fragment>
      {
      DataCheck ?
      FollowFunc()
      :
      <Button
          style={{ display: "inline-block", width: "100px",float:'right' }}
          variant="outlined"
        >
          <CircularProgress size={20}/>
      </Button>
      }
    </React.Fragment>
  )
}

export default React.memo(FollowingCmp)