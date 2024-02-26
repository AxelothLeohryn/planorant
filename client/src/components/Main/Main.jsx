import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Planner from "./Planner";
import Profile from "./Profile";

const Main = () => {
  return (
    <>
      <main className="mx-6">
        <Routes>
          <Route path="/" element={<Planner />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
