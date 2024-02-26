import React, { useEffect, useState } from "react";
import axios from "axios";
import NoTeamsPage from "./NoTeamsPage/NoTeamsPage";
import Planner from "./Planner/Planner";
import { useAuth } from "../../../context/AuthContext";

const PlannerSection = () => {
  const { userName, team, setTeam } = useAuth();
  const [haveTeam, setHaveTeam] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkUserTeam = async () => {
      try {
        const response = await axios.get(`/api/player/username/${userName}`);
        // console.log(response.data);
        if (response.data && response.data.team) {
          //Store team ID in context
          setTeam(response.data.team);
          setHaveTeam(true);
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
  }, [team]); // If team changes (or gets created), re-check if user has a team

  if (!haveTeam) {
    return (
      <>
        {isLoading && <div className="skeleton-pulse h-24"></div>}
        {!isLoading && <NoTeamsPage setHaveTeam={setHaveTeam} />}
      </>
    );
  } else {
    return (
      <>
        {isLoading && <div className="skeleton-pulse h-24"></div>}
        {!isLoading && (<Planner setHaveTeam={setHaveTeam}/>)}
      </>
    );
  }
};
export default PlannerSection;
