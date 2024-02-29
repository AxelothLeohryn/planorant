import React, { useEffect, useState } from "react";

const ChatBar = ({socket}) => {
const [users, setUsers] = useState([]);

useEffect(() => {
  socket.on('newUserResponse', (data) => setUsers(data));
  console.log("Users received: ", users);
}, [socket, users]);

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {console.log(users)}
        {users.map((user) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
