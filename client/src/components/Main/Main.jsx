import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PlannerSection from "./PlannerSection";
import Profile from "./Profile";


const Main = () => {
  return (
    <>
      <main className="mx-auto p-4 mt-4 max-w-[1920px] transition ">
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
