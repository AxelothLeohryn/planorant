import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { set } from "mongoose";

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
      const response = await axios.post("/api/player/create", {
        username,
        email: userEmail,
      });

      await delay(1000);

      setLoadingUserName(false);
      console.log(response);
      setUserName(username);
      setIsNewUser(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="flex flex-col w-full max-w-sm gap-6 mx-auto my-12">
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
                    ? "w-full btn btn-loading bg-red-8"
                    : "w-full btn btn-primary bg-red-8"
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
      </div>
    </>
  );
};

export default CreateUser;
