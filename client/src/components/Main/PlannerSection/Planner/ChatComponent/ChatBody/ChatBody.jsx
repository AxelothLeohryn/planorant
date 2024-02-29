import React from "react";

const ChatBody = ({ messages, playersData, lastMessageRef }) => {
  return (
    <>
      <div>
        {messages.map((message, index) => {
          const isCurrentUserMessage =
            message.name === localStorage.getItem("userName").replace(/"/g, "") || message.username === localStorage.getItem("userName").replace(/"/g, "");
          const chatAlignment = isCurrentUserMessage
            ? "justify-end text-right"
            : "justify-start text-left";
          const bubbleColor = isCurrentUserMessage
            ? "bg-slate-12 text-black"
            : "bg-border text-white";

            const isLastMessage = index === messages.length - 1;

          return (
            <div key={message.id} className={`flex ${chatAlignment} mb-4`}>
              {/* Conditionally render the avatar only for messages from others */}
              {!isCurrentUserMessage && (
                <div className="chat-image avatar flex-shrink-0 mr-2">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {playersData.map((player) => {
                      if (player.username === message.name || player.username === message.username) {
                        return (
                          <>
                            <div className="avatar border border-2 border-border">
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
              <div>
                <div className="chat-header mb-1">
                  <span className="font-bold">{message.name}</span>
                  <time className="text-xs opacity-75 ml-2">
                    {message.time.slice(0, -3)}
                  </time>
                </div>
                <div className={`chat-bubble p-2 rounded-lg ${bubbleColor} mb-2`}>
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
