import React, { useRef } from "react";
import styled from "styled-components";
import firebase from "firebase";
import { AvatarGenerator } from "random-avatar-generator";

import { Button } from "@material-ui/core";
import { db } from "../../firebase";

export const generator = new AvatarGenerator();

const ChatInput = ({ chatRef, channelName, channelId }) => {
  const avatar = generator.generateRandomAvatar();
  const inputRef = useRef(null);

  const sendMessageHandler = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: "Neo",
      userImage: avatar,
    });

    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    inputRef.current.value = "";
  };
  return (
    <ChatInputContainer>
      <form>
        <input ref={inputRef} placeholder={`Message #${channelName}`} />
        <Button hidden type="submit" onClick={sendMessageHandler}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    width: 60%;
    bottom: 30px;
    padding: 20px;
    outline: none;
    border-radius: 3px;
    border: 1px solid gray;
  }

  > form > button {
    display: none !important;
  }
`;
