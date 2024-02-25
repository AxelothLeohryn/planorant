import React from "react";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
const {userEmail, userName} = useAuth();

  return <header>Welcome, {userName}</header>;
};

export default Header;
 