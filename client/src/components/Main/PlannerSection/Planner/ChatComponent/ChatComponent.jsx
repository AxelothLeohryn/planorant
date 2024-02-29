import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

import socketIO from "socket.io-client";

const ChatComponent = () => {
  const { userName } = useAuth();
  const [messages, setMessages] = useState([]);

  const socket = socketIO.connect("http://localhost:5000");
  console.log(socket);

  useEffect(() => {
    // Connect to the socket server when the component mounts
    const socket = socketIO.connect("http://localhost:5000");

    // Emit the newUser event immediately after connecting
    socket.emit("newUser", { userName, socketID: socket.id });
    console.log("Sending new user to server", userName);

    // Return a cleanup function that disconnects the socket
    // when the component unmounts
    return () => {
      console.log("User disconnected", userName);
      socket.disconnect();
    };
  }, [userName]); // Only reconnect when userName changes

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);
  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatComponent;
