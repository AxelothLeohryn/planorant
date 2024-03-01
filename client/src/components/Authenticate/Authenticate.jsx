import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const Authenticate = () => {
  const { login } = useAuth();

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen relative">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src="login-background.svg"
          alt="Background"
        />
        <div className="flex flex-col justify-center items-center max-h-screen max-w-screen relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-valorant">PLANORANT</h1>
          <div className="flex flex-row gap-2">
            <h2 className="mb-6 font-bold font-DIN">
              Valorant Premier Planner
            </h2>
            <img className="size-5" src="/Premier.webp" alt="Premier Logo" />
          </div>
          <div className="flex flex-col items-center justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decodedToken = jwtDecode(credentialResponse?.credential);
                login(decodedToken.email);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              shape="circle"
              theme="filled_black"  


            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Authenticate;
