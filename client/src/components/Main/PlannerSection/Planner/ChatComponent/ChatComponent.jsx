import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import socketIO from "socket.io-client";

const ChatComponent = ({ playersData }) => {
  const { userName } = useAuth();
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  // Initialize socket connection outside useEffect to ensure it's done once
  // Moved inside useEffect for cleanup and dependency handling
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = socketIO.connect("http://localhost:5000");
    setSocket(newSocket);

    // Emit the newUser event immediately after connecting
    newSocket.emit("newUser", { userName, socketID: newSocket.id, teamId: playersData[0].team });
    console.log("Sending new user to server", userName);

    // Setup listener for incoming messages
    newSocket.on("messageResponse", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Return a cleanup function that disconnects the socket
    // when the component unmounts
    return () => {
      console.log("User disconnected", userName);
      newSocket.disconnect();
    };
  }, [userName]); // Only reconnect when userName changes

  useEffect(() => {
    // Scroll to the bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  // Ensure that socket is not null before rendering components that require it
  if (!socket) return <div>Loading...</div>;

  return (
    <div className="w-full bg-backgroundSecondary p-5 flex flex-col md:flex-row gap-4">
      <ChatBar playersData={playersData} socket={socket} />
      <div className="md:w-3/4 h-[57vh] md:h-[50vh] flex flex-col">
        <div className="overflow-y-scroll flex-grow bg-gray-3 border border-border rounded p-5">
          <ChatBody
            lastMessageRef={lastMessageRef}
            playersData={playersData}
            messages={messages}
          />
        </div>
        <ChatFooter playersData={playersData} socket={socket} />
      </div>
    </div>
  );
};

export default ChatComponent;
