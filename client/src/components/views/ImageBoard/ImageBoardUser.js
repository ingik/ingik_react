import { Avatar, Button, Popover, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import HoverProfile from "../Profile/HoverProfile";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";

function ImageBoardUser(props) {
  const UserSelectData = useSelector((state) => state.user.userData);

  const [ParentModal, setParentModal] = useState(false);

  let childmodal = false;
  let leaveCheck = false;

  const history = useHistory();
  const [UserData, setUserData] = useState({});
  const [open] = useState(false);

  const [DialogOpen, setDialogOpen] = React.useState(false);

  const handleOpen = () => {
    setDialogOpen(true);
  };
  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    let ComponentMounted = true;
    if (props.userId) {
      axios.get("/api/users/findId/" + props.userId).then((response) => {
        if (ComponentMounted) {
          setUserData(response.data);
        }
      });
    }

    return () => {
      console.log("imageBoardUser CleanUp");
      ComponentMounted = false;
    };
  }, [props.userId]);

  const onClickHandler = () => {
    history.push("/profile/" + UserData?._id);
    window.location.reload();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    leaveCheck = true;
    if(!ParentModal){
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      if (leaveCheck) {
        setParentModal(true);
      }
    }, 1000);
  }
  };

  const handlePopoverClose = () => {
    leaveCheck = false;
    setTimeout(() => {
      if (!childmodal) setParentModal(false);
    }, 100);
  };

  const onDeleteButton = () => {
    axios
      .delete(
        "/api/boards/imageBoard/delete/" +
          props.boardId +
          "/" +
          UserSelectData._id
      )
      .then((response) => {
        // console.log(response.data)
        setDialogOpen(false);
        window.location.reload();
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <Avatar
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={onClickHandler}
        alt={UserData?.name}
        src={UserData?.image}
        sx={{
          verticalAlign: "top",
          width: "32px",
          height: "32px",
          cursor: "pointer"
        }}
      />
      <Popover
        id="mouse-over-popover"
        style={{
          pointerEvents: "none",
        }}
        open={ParentModal}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transitionDuration={{ appear: 3000, enter: 500 }}
        disableRestoreFocus
        onMouseEnter={() => {
          console.log("enter child");
          childmodal = true;
        }}
        onMouseLeave={() => {
          console.log("leave child");
          childmodal = false;
          leaveCheck = false;
          setParentModal(false);
        }}
      >
        <HoverProfile UserData={UserData} />
      </Popover>

      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onClick={onClickHandler}
        variant="h6"
        component="div"
        style={{
          display: "inline-block",
          verticalAlign: "top",
          margin: "0px 10px 0 10px",
          cursor: "pointer"
        }}
      >
        {UserData?.name}
      </Typography>
      {props.userId === UserSelectData._id ? (
        <Button
          sx={{ float: "right", marginLeft: "auto" }}
          onClick={handleOpen}
        >
          <DeleteForeverIcon />
        </Button>
      ) : null}

      <Dialog
        open={DialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"이 게시물을 삭제하시겠습니까?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            한번 삭제한 게시물은 복구 시킬 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteButton} variant>
            삭제
          </Button>
          <Button onClick={handleClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(ImageBoardUser);
