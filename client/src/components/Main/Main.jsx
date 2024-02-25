import React from "react";
import { useAuth } from "../../context/AuthContext";

const Main = () => {
  const { logout } = useAuth();

  return (
    <main>
      <h1>Hello</h1>
    </main>
  );
};

export default Main;
