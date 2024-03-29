import React, { useEffect } from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../context/AuthContext";

const Authenticate = () => {
  const { login } = useAuth();

   // useEffect hook to set the light theme when the component mounts (fix for the google login button on dark theme)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');

    // Return a cleanup function to reset/remove the attribute when the component unmounts
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, []); 

  return (
    <>
      <main className="flex flex-col items-center justify-center h-screen relative">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src="login-background.svg"
          alt="Background"
        />
        <div className="flex flex-col justify-center items-center max-h-screen max-w-screen relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-valorant text-white animate-fade-right animate-once animate-ease-in-out">PLANORANT</h1>
          <div className="flex flex-row gap-2 animate-fade-left animate-once animate-ease-in-out">
            <h2 className="mb-6 font-bold font-DIN text-white">
              Valorant Premier Planner
            </h2>
            <img className="size-5" src="/Premier.webp" alt="Premier Logo" />
          </div>
          <div className="flex flex-col items-center justify-center animate-fade animate-once animate-delay-1000">
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
