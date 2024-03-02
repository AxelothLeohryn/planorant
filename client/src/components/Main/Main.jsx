import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PlannerSection from "./PlannerSection";
import Profile from "./Profile";


const Main = () => {
  return (
    <>
      <main className="mx-auto md:mx-5 p-4 md:p-0 mt-4 overflow-y-hidden transition ">
        <Routes>
          <Route path="/" element={<PlannerSection />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </main>
    </>
  );
};

export default Main;
