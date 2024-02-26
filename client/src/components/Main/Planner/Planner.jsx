import React, { useEffect, useState } from "react";
import axios from "axios";
import NoTeamsPage from "./NoTeamsPage/NoTeamsPage";
import { useAuth } from "../../../context/AuthContext";

const Planner = () => {
  const {userName, team, setTeam} = useAuth();
  const [haveTeam, setHaveTeam] = useState(false);

  useEffect(() => {
    const checkUserTeam = async () => {
      try {
        const response = await axios.get(`/api/player/username/${userName}`);
        // console.log(response.data);
        if (response.data && response.data.team) {
          console.log("check");
          setHaveTeam(true);
          setTeam(response.data.team);
        } else {
          setHaveTeam(false);
        }
      } catch (error) {
        console.error("Failed to fetch user team:", error);
        setHaveTeam(false);
      }
    };

    if (userName) {
      checkUserTeam();
    }
  }, [team]); // Depend on team so the effect runs again if it changes

  if (!haveTeam) {
    return (
      <>
        <NoTeamsPage />
      </>
    );
  } else {
    return (
      <>
        <h1>Planner</h1>
        <p>{team}</p>
      </>
    );
  }
};
export default Planner;
