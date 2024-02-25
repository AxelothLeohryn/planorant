import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const Authenticate = () => {
  const { login } = useAuth();

  return (
    <>
      <main className="flex flex-col w-full h-screen">
        <h1 className="mx-auto mt-36 text-5xl lg:text-7xl font-valorant">PLANORANT</h1>
        <h2 className="mx-auto mb-6 font-bold">Premiere Planner</h2>
        <div className="flex flex-col items-center justify-center h-16 mx-auto bg-red-700 p-4 m-4 rounded-full">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decodedToken = jwtDecode(credentialResponse?.credential);
              login(decodedToken.email); // Use the login method from context
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          shape="pill"
          theme="filled_black"
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
