import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Following from './Following'
import UnFollowing from './UnFollowing'

function FollowingCmp(props) {
  const [FollowDisplay, setFollowDisplay] = useState(false);

  useEffect(() => {
    console.log("FollowCheck");

    let body = {
      followerId: props.followerId,
      followingId: props.followingId,
    };

    console.log(body);

    axios.post("/api/users/followCheck", body).then((response) => {
      console.log(response.data);
      if (!response.data) {
        setFollowDisplay(false);
      } else {
        setFollowDisplay(true);
      }
    });
  }, [props.followerId, props.followingId, FollowDisplay]);

  const onFollowHandler = () => {
    setFollowDisplay(Following(props.followerId, props.followingId));
  };

  const onUnFollowHanler = () => {
    setFollowDisplay(UnFollowing(props.followerId, props.followingId));
  };

  const FollowFunc = () => {
    if (FollowDisplay === false) {
      return (
        <Button
          onClick={onFollowHandler}
          style={{ display: "inline-block", width: "150px",float:'right' }}
          variant="contained"
        >
          follow
        </Button>
      );
    } else {
      return (
        <Button
          onClick={onUnFollowHanler}
          style={{ display: "inline-block", width: "150px",float:'right' }}
          variant="outlined"
        >
          Unfollow
        </Button>
      );
    }
  };

  return <React.Fragment>{FollowFunc()}</React.Fragment>;
}

export default FollowingCmp