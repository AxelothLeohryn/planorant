import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const Authenticate = () => {
  const { login } = useAuth();

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decodedToken = jwtDecode(credentialResponse?.credential);
          login(decodedToken.email); // Use the login method from context
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default Authenticate;
