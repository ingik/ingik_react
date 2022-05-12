import { Avatar, Button, Divider, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./Chat.css";

import useMediaQuery from "@mui/material/useMediaQuery";
import { io } from "socket.io-client";

//socket
const localhost = "http://3.38.119.177:5555";
let socket;

function DMList(props) {
  const userData = useSelector((state) => state.user.userData);

  const [ChatList, setChatList] = useState([]);
  const [Message, setMessage] = useState(null);

  const [ChatData, setChatData] = useState(null);
  const [OtherUser, setOtherUser] = useState(null);

  const [ChatRoomId, setChatRoomId] = useState(null);

  const ScrollRef = useRef(null);

  const mediaQuery = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    axios.get("/api/users/findId/" + props.OtherUserId).then((response) => {
      console.log(response.data);
      setOtherUser(response.data);
    });
  }, [props.OtherUserId]);

  useEffect(() => {
    const params = {
      user: userData._id,
      other: props.OtherUserId,
    };

    axios.get("/api/DirectMessage/chatList/", { params }).then((response) => {
      console.log(response.data[0]);
      setChatData(response.data[0]);
      setChatList(response.data[0].chatList);
      // socketFunc(response.data[0]._id)
      setChatRoomId(response.data[0]._id);
    });
  }, [props.OtherUserId, userData._id]);

  useEffect(() => {
    console.log("DM start");

    if (ChatRoomId) {
      socket = io.connect(localhost);

      console.log(socket);
      socket.emit("joinRoom", ChatRoomId);
      // socket.on('room Info',(data)=>{ console.log('Room info : '+ data)})

      socket.on("my socket id", (data) => {
        console.log("mySocketID : ", data);
      });

      let body = {
        name: userData.name,
        room: ChatRoomId,
      };

      socket.emit("enter chatroom", body);

      socket.on("client login", (data) => {
        console.log("client login : ", data);
      });

      socket.on("leave alert", (data) => {
        console.log(data);
      });

      socket.on("all message", (data) => {
        console.log("receive message");
        console.log(data);

        setChatList((prevState) => {
          return [...prevState, data];
        });
      });

      return () => {
        console.log("leeeeeeeeeeeeeeeeeeeve");
        socket.emit("leave chatroom", ChatRoomId);
        socket.off("client login");
        socket.off("all message");
        socket.off("leave alert");

        // socket.disconnect();
        // socket.on("disconnected", (data) => {
        //   console.log("data : " + data);
        // });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ChatRoomId]);

  useEffect(() => {
    console.log("scroll");
    // ScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    ScrollRef.current.scrollIntoView(false);
  }, [ChatList]);

  const onMessageHandler = (event) => {
    setMessage(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    console.log("Submit");
    // event.preventDefault()

    if (Message.trim().length !== 0) {
      let body = {
        _id: ChatData._id,
        chatSendId: userData._id,
        chatContent: Message,
        room: ChatRoomId,
      };

      console.log(body);
      socket.emit("send message", body);

      setMessage("", "");
      // setMessage("")
    }
  };

  const userRender = (list) => {
    if (list.chatSendId === userData._id) {
      return (
        <div className="chat_user_card">
          <div className="chat_user_flex">
            <div className="chat_user">{list.chatContent}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="chat_other_card">
          <div className="chat_other_flex" style={{ marginLeft: "5px" }}>
            <Avatar
              alt={OtherUser?.name}
              src={OtherUser?.image}
              className="chat_other_avatar"
              sx={{
                width: "30px",
                height: "30px",
                verticalAlign: "center",
                margin: "auto 0",
              }}
            />

            <div className="chat_other">{list.chatContent}</div>
          </div>
        </div>
      );
    }
  };

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmitHandler();
      // setMessage("","")
    }
  };

  return (
    <div className={mediaQuery ? `dm_component` : `dm_component_small`}>
      <div className="chat_wrap">
        <div className={mediaQuery ? `chat_header` : `chat_header_small`}>
          <Avatar
            alt={OtherUser?.name}
            src={OtherUser?.image}
            className="chat_avarta"
          />
          <div className="chat_header_name">{OtherUser?.name}</div>
        </div>
        <Divider />
        <div className={mediaQuery ? `chat_form` : `chat_form_small`}>
          {ChatList.map((list, index) => {
            return <div key={index}>{userRender(list)}</div>;
          })}
          <div ref={ScrollRef}></div>
        </div>

        <div className="input-div">
          <form className="input-form">
            <TextField
              variant="outlined"
              placeholder="Press Enter for send message."
              type="text"
              className="input-textarea"
              sx={{ width: "100%" }}
              multiline={true}
              inputProps={{ style: { height: "100px" } }}
              size="500"
              row="500"
              onChange={onMessageHandler}
              onKeyPress={onCheckEnter}
              value={Message}
            />
            <Button
              className="send_button"
              variant="contained"
              onClick={onSubmitHandler}
              disabled={Message ? false : true}
            >
              send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DMList);
