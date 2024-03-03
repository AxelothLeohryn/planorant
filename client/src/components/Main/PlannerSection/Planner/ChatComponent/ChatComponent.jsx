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
    //REMOVE LOCALHOST, LEAVE EMPTY IN PRODUCTION
    // const newSocket = socketIO.connect("http://localhost:5000");
    const newSocket = socketIO.connect();

    setSocket(newSocket);

    // Emit the newUser event immediately after connecting
    newSocket.emit("newUser", {
      userName,
      socketID: newSocket.id,
      teamId: playersData[0].team,
    });
    // console.log("Sending new user to server", userName);

    // Request historical messages for the team
    // Make sure the teamId is available
    if (playersData.length > 0) {
      newSocket.emit("requestMessages", { teamId: playersData[0].team });
    }

    // Setup listener for incoming messages
    newSocket.on("messageResponse", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Return a cleanup function that disconnects the socket
    // when the component unmounts
    return () => {
      // console.log("User disconnected", userName);
      newSocket.disconnect();
    };
  }, [userName, playersData]); // Include playersData in the dependency array

  useEffect(() => {
    const handleMessagesHistory = (historicalMessages) => {
      setMessages(historicalMessages);
      // console.log("Received historical messages", historicalMessages);
    };

    if (socket) {
      socket.on("messagesHistory", handleMessagesHistory);
    }

    // Cleanup to avoid memory leaks
    return () => {
      if (socket) {
        socket.off("messagesHistory", handleMessagesHistory);
      }
    };
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);

  if (!socket) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-[1920px] bg-backgroundPrimary px-5 flex flex-col md:flex-row-reverse gap-4 ">
      <ChatBar playersData={playersData} socket={socket} />
      <div className="md:w-3/4 h-[57vh] md:h-[87vh] flex flex-col border-2 border-border rounded">
        <div className="overflow-y-scroll flex-grow bg-gray-4 p-5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-content3 scrollbar-track-slate-content1 relative">
          <ChatBody
            socket={socket}
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
