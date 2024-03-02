import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import CreateWeekForm from "./CreateWeekComponent/CreateWeekForm/CreateWeekForm";

import Week from "./Week/Week";
import ChatComponent from "./ChatComponent/ChatComponent";
import Team from "./Team/Team";
import CreateWeekComponent from "./CreateWeekComponent/CreateWeekComponent";

const Planner = ({ setHaveTeam }) => {
  const { team, setTeam, userName } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);
  const [teamMembersNumber, setTeamMembersNumber] = useState(0);

  const [refresh, setRefresh] = useState(false);

  const [playersData, setPlayersData] = useState([]);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [showChatMobile, setShowChatMobile] = useState(false);

  const toggleRefresh = () => setRefresh(!refresh);

  const toggleShowChatMobile = () => {
    setShowChatMobile(!showChatMobile);
  };

  const handleDeleteTeam = async () => {
    // Delete each player associated with the team and its weeks (right now we are considering only 1 team per player)
    for (const playerId of teamData.players) {
      await axios.put(`/api/player/edit/${playerId}`, {
        team: null,
        weeks: [],
      });
    }

    // Delete the team
    await axios.delete(`/api/team/delete/${team}`);

    setTeamData(null);
    setHaveTeam(false);
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      setIsLoading(true);
      if (team) {
        try {
          const teamFetchedData = await axios.get(`/api/team/${team}`);
          setTeamData(teamFetchedData.data);
          setTeamMembersNumber(teamFetchedData.data.players.length);

          // Fetch all player data in parallel using Promise.all
          const playersPromises = teamFetchedData.data.players.map((playerId) =>
            axios.get(`/api/player/${playerId}`)
          );
          const playersResponses = await Promise.all(playersPromises);

          // Extract the data from each player response
          const playersDataFetched = playersResponses.map(
            (response) => response.data
          );
          setPlayersData(playersDataFetched);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching team data:", error);
        }
      }
    };
    fetchTeamData();
  }, [team, refresh]);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    // Cleanup to remove the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return <div className="skeleton-pulse h-24"></div>;
  } else {
    return (
      <>
        <button className="md:hidden btn mb-2" onClick={toggleShowChatMobile}>
          Show Chat
        </button>
        {showChatMobile && <ChatComponent playersData={playersData} />}
        <div className="md:flex">
          <div>
            <Team
              teamData={teamData}
              teamMembersNumber={teamMembersNumber}
              playersData={playersData}
              handleDeleteTeam={handleDeleteTeam}
              toggleRefresh={toggleRefresh}
            />

            <CreateWeekComponent
              team={team}
              teamData={teamData}
              toggleRefresh={toggleRefresh}
            />
          </div>
          {isDesktop && (
            <div className="hidden md:flex">
              <ChatComponent playersData={playersData} />
            </div>
          )}
        </div>
      </>
    );
  }
};
export default Planner;
