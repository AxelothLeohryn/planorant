import React from "react";

const ChatBody = ({ messages, playersData, lastMessageRef }) => {
  return (
    <>
      <div>
        {messages.map((message, index) => {
          const isCurrentUserMessage =
            message.name ===
              localStorage.getItem("userName").replace(/"/g, "") ||
            message.username ===
              localStorage.getItem("userName").replace(/"/g, "");
          const chatAlignment = isCurrentUserMessage
            ? "justify-end text-right"
            : "justify-start text-left";
          const bubbleColor = isCurrentUserMessage
            ? "bg-content1 text-backgroundPrimary"
            : "bg-backgroundPrimary text-content1";

          const isLastMessage = index === messages.length - 1;

          // Convert message.time to a Date object and format it
          const messageTime = new Date(message.time).toLocaleString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });

          return (
            <div key={message.id} className={`flex ${chatAlignment} mb-4`}>
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
                          <>
                            <div className="avatar border-2 border-border">
                              <img
                                className="w-full h-full object-cover"
                                src={player.image}
                                alt={player.username}
                                key={player.username}
                              />
                            </div>
                          </>
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
                  <time className="text-xs opacity-75 ml-2">{messageTime}</time>
                </div>
                <div
                  className={`w-fit p-2 rounded-lg ${bubbleColor} mb-2 break-all`}
                >
                  {message.text}
                </div>
                {/* <div className="chat-footer text-xs opacity-75 mt-1">
                  {message.footer}
                </div> */}
              </div>
              {isLastMessage && <div ref={lastMessageRef} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChatBody;