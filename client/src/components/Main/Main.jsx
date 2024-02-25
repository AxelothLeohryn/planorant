import React from "react";
import { useAuth } from "../../context/AuthContext";

const Main = () => {
  const { logout } = useAuth();

  return (
    <main>
      <button onClick={logout}>Log Out</button>
    </main>
  );
};

export default Main;
