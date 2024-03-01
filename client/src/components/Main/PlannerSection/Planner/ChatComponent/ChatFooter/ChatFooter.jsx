import React, { useState } from "react";

const ChatFooter = ({ socket, playersData }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    const userName = localStorage.getItem("userName").replace(/"/g, "");
    if (message.trim() && userName) {
      // Attempt to find the user in playersData whose username matches the userName
      const user = playersData.find((player) => player.username === userName);
      if (!user) {
        console.error("User not found in playersData");
        return; // Early return if the user wasn't found
      }

      socket.emit("message", {
        text: message,
        name: userName,
        image: user.image,
        senderId: user._id, // Assign the _id of the user as senderId
        time: new Date(),
        id: `${socket.id}${Math.random()}`, // Unique identifier for the message
        socketID: socket.id,
        teamId: playersData[0].team, // Assuming the teamId is the same for all playersData[0].team
      });

      setMessage(""); // Clear the message input after sending
    }
  };

  return (
    <div className="bg-border flex-shrink-0">
      <form
        className="flex w-full justify-between items-center gap-1 p-1"
        onSubmit={handleSendMessage}
      >
        <input
          type="text"
          placeholder="Write message..."
          className="flex-grow input input-block"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="btn w-1/3 hover:bg-backgroundPrimary m-1"
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
