import React, { useState } from "react";

const ChatFooter = ({ socket, playersData }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("userName").replace(/"/g, ""), // Remove quotes from userName
        time: new Date().toLocaleTimeString(),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        teamId: playersData[0].team,
      });
    }
    setMessage("");
  };

  return (
    <div className="bg-border flex-shrink-0 ">
      <form className="flex w-full justify-between items-center gap-1 p-1" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="flex-grow input input-block"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn w-1/3 hover:bg-backgroundPrimary m-1">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
