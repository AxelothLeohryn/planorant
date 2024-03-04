import React, { useEffect, useState } from "react";

const ChatBody = ({ socket, messages, playersData, lastMessageRef }) => {
  const [typingUsers, setTypingUsers] = useState([]);
  // Group messages by date
  const groupedMessages = messages.reduce((acc, message) => {
    const messageDate = new Date(message.time).toLocaleDateString("en-US");
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(message);
    // console.log("Grouped messages: ", acc);
    // console.log(Object.entries(acc));
    return acc;
  }, {});

  useEffect(() => {
    const handleTypingUserAdd = (user) => {
      setTypingUsers((prevUsers) => {
        // Check if the user is already in the typingUsers list
        if (!prevUsers.includes(user.userName)) {
          // If not, add the user to the list
          return [...prevUsers, user.userName];
        }
        // If the user is already in the list, return the list unchanged
        return prevUsers;
      });
    };

    const handleTypingUserDelete = (user) => {
      setTypingUsers((prevUsers) =>
        prevUsers.filter((u) => u !== user.userName)
      );
    };

    socket.on("typingUserAdd", handleTypingUserAdd);
    socket.on("typingUserDelete", handleTypingUserDelete);

    // Cleanup function to remove event listeners
    return () => {
      socket.off("typingUserAdd", handleTypingUserAdd);
      socket.off("typingUserDelete", handleTypingUserDelete);
    };
  }, [socket]); // Depend on socket only to setup and cleanup event listeners

  // Function to generate the typing message
  const getTypingMessage = () => {
    switch (typingUsers.length) {
      case 0:
        return "";
      case 1:
        return `${typingUsers[0]} is typing...`;
      case 2:
        return `${typingUsers[0]} and ${typingUsers[1]} are typing...`;
      default:
        const lastUser = typingUsers[typingUsers.length - 1];
        const otherUsers = typingUsers.slice(0, -1).join(", ");
        return `${otherUsers} and ${lastUser} are typing...`;
    }
  };

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-content2">No messages yet</p>
      </div>
    );
  } else {
    return (
      <>
        <div>
          {/* Group messages by day of the month */}
          {Object.entries(groupedMessages).map(([date, messages]) => (
            <div key={date}>
              <div className="divider divider-horizontal">
                {new Date(date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              {messages.map((message, index) => {
                const isCurrentUserMessage =
                  message.name ===
                    localStorage.getItem("userName").replace(/"/g, "") ||
                  message.username ===
                    localStorage.getItem("userName").replace(/"/g, "");
                const chatAlignment = isCurrentUserMessage
                  ? "justify-end text-left"
                  : "justify-start text-left";
                const bubbleColor = isCurrentUserMessage
                  ? "bg-content1 text-backgroundPrimary"
                  : "bg-backgroundPrimary text-content1";

                const isLastMessage = index === messages.length - 1;

                // Convert message.time to a Date object and format it
                const messageTime = new Date(message.time).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  }
                );

                return (
                  <>
                    <div
                      key={message.id}
                      className={`flex ${chatAlignment} mb-7`}
                    >
                      {/* Conditionally render the avatar only for messages from others */}
                      {!isCurrentUserMessage && (
                        <div className="avatar flex-shrink-0 mr-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            {playersData.map((player) => {
                              if (
                                player.username === message.name ||
                                player.username === message.username
                              ) {
                                return (
                                  <div
                                    className="avatar border-2 border-border"
                                    key={player.username}
                                  >
                                    <img
                                      className="w-full h-full object-cover"
                                      src={player.image}
                                      alt={player.username}
                                    />
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </div>
                        </div>
                      )}
                      <div className="items-end">
                        <div className="chat-header mb-1">
                          <span className="font-bold">{message.name}</span>
                          <time className="text-xs opacity-75 ml-2">
                            {messageTime}
                          </time>
                        </div>
                        <div
                          className={`w-fit p-2 rounded-lg ${bubbleColor} mb-2 break-all`}
                        >
                          {message.text}
                        </div>
                      </div>
                    </div>
                    {isLastMessage && (
                      <>
                        <div className="" ref={lastMessageRef} />
                      </>
                    )}
                  </>
                );
              })}
            </div>
          ))}
          {typingUsers.length > 0 && (
            <>
              <div className="relative">
                <div className="absolute bottom-1">
                  <p>{getTypingMessage()}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
};

export default ChatBody;
