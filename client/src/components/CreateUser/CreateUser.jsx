import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const CreateUser = () => {
  const { logout, userEmail, setIsNewUser, setUserName } = useAuth();
  const [username, setUsername] = useState("");
  const [loadingUserName, setLoadingUserName] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Simulate loading
    const delay = (duration) =>
      new Promise((resolve) => setTimeout(resolve, duration));

    setLoadingUserName(true);
    try {
       // First, check if the username already exists
       const checkResponse = await axios.get(`/api/player/username/${username}`);
       console.log(checkResponse);
       if (checkResponse.data !== null) {
         // If username exists, show a toast and do not proceed with user creation
         toast.error("Username already exists. Please choose a different one.");
         setLoadingUserName(false);
         return;
       }
 
       // If username does not exist, proceed with user creation
       const createResponse = await axios.post("/api/player/create", {
         username,
         email: userEmail,
       });

      await delay(1000);

      setLoadingUserName(false);
      // console.log(response);
      setUserName(username);
      setIsNewUser(false);
      toast.success("User created successfully. Welcome to Planorant!");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
      setLoadingUserName(false);
    }
  };
  return (
    <>
      <main className="flex flex-col w-full max-w-sm gap-6 mx-auto px-4 my-12">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold">Welcome to Planorant!</h1>
        </div>
        <form className="form-group" onSubmit={handleSubmit}>
          <label className="form-label">What is your Valorant username?</label>
          <div className="relative w-full form-control">
            <input
              placeholder="Type here"
              className="max-w-full pl-10 input input-lg"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="absolute inset-y-0 inline-flex items-center left-3">
              <img
                src="./valorant-logo.svg"
                className="w-5 h-5 text-content3"
                alt="valorant logo"
              />
            </span>
          </div>
          <div className="pt-5 form-field">
            <div className="justify-between form-control">
              <button
                type="submit"
                className={
                  loadingUserName
                    ? "w-full btn btn-loading bg-primary"
                    : "w-full btn btn-primary bg-primary"
                }
              >
                {loadingUserName ? "Loading" : "Start Planning"}
              </button>
            </div>
          </div>
        </form>
        <div className="form-field">
          <div className="justify-center form-control">
            <a
              onClick={logout}
              className="text-sm link link-underline-hover link-primary text-red-400"
            >
              Log out
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateUser;
