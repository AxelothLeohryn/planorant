import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const CreateUser = () => {
  const { logout, userEmail, setIsNewUser, setUserName } = useAuth();
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/player/create", {
        username,
        email: userEmail,
      });
      console.log(response);
      setUserName(username);
      setIsNewUser(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <button onClick={logout}>Log Out</button>
      <h2>Welcome! What is your Valorant username?</h2>
      <form onSubmit={handleSubmit}>
        <label>Valorant Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{username}</p>
    </>
  );
};

export default CreateUser;
