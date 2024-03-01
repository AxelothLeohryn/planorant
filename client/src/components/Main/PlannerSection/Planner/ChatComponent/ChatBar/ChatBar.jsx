import React, { useEffect, useState } from "react";

const ChatBar = ({ socket, playersData }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Listener for newUserResponse to update the list of users
    const handleNewUserResponse = (data) => {
      setUsers(data);
    };

    socket.on("newUserResponse", handleNewUserResponse);
    console.log("Listening for newUserResponse");

    // Cleanup function to remove the listener
    return () => {
      socket.off("newUserResponse", handleNewUserResponse);
    };
  }, [socket]); // Dependency on socket ensures listener is added once socket is available

  return (
    <div className="md:w-1/3">
      <h4>ACTIVE USERS</h4>
      <div className="bg-border p-4 rounded">
        <div className="flex flex-col gap-3">
          {users.map((user) => (
            <div className="flex items-end gap-2" key={user.socketID}>
              <div className="avatar avatar-sm avatar-online rounded-full">
                {playersData.map((player) => {
                  if (player.username === user.userName) {
                    return <img src={player.image} alt="" key={player.username} />;
                  }
                  return null;
                })}
              </div>
              <p>{user.userName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
