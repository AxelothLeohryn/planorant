import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const Authenticate = () => {
  const { login } = useAuth();

  return (
    <>
      <main className="flex flex-col w-full h-screen gap-5">
        <h1 className="mx-auto mt-8 text-7xl font-valorant">PLANORANT</h1>
        <div className="items-center h-16 mx-auto">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decodedToken = jwtDecode(credentialResponse?.credential);
              login(decodedToken.email); // Use the login method from context
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          shape="pill"
          theme="filled_blue"
          logo_alignment="left"
          useOneTap={false}
          auto_select={false}
          text="Sign in with Google"
          />
        </div>
      </main>
    </>
  );
};

export default Authenticate;
