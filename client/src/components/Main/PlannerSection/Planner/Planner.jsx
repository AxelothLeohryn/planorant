import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

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

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1536);
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

    //Delete the messages associated with the team
    //TODO - create route to delete messages by team

    // Delete the team
    await axios.delete(`/api/team/delete/${team}`);
    toast.success("Team deleted successfully");

    setTeamData("");
    setHaveTeam(false);
  };

  const handleLeaveTeam = async () => {
    // Fetch the data of the player to leave the team
    const playerData = playersData.find((player) => player.username === userName)

    try {
      //Delete the team and weeks from player
      await axios.put(`/api/player/edit/${playerData._id}`, {
        team: null,
        weeks: [],
      });
      //Delete the player from the team
      await axios.put(`/api/team/edit/${team}`, {
        players: teamData.players.filter(
          (playerId) => playerId !== playerData._id
        ),
      });
      setTeam(null);
      setHaveTeam(false);
      toast.success("You have left the team");
    } catch (error) {
      console.error("Failed to leave team:", error);
      toast.error("Failed to leave team");
    }
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
    const handleResize = () => setIsDesktop(window.innerWidth >= 1536);
    window.addEventListener("resize", handleResize);
    // Cleanup to remove the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return <div className="skeleton-pulse h-24"></div>;
  } else {
    return (
      <>
        {!isDesktop && (
          <button className="btn mb-2" onClick={toggleShowChatMobile}>
            Show Chat
          </button>
        )}

        {showChatMobile && <ChatComponent playersData={playersData} />}
        <div className="2xl:flex xl:max-w-[1920px]">
          <div className="max-w-full 2xl:w-2/3 animate-fade-down md:animate-none animate-ease-out animate-duration-75">
            <Team
              teamData={teamData}
              teamMembersNumber={teamMembersNumber}
              playersData={playersData}
              handleDeleteTeam={handleDeleteTeam}
              handleLeaveTeam={handleLeaveTeam}
              toggleRefresh={toggleRefresh}
            />

            <CreateWeekComponent
              team={team}
              teamData={teamData}
              toggleRefresh={toggleRefresh}
            />
          </div>
          {isDesktop && (
            <div className="h-fit w-1/2 sticky top-[4.5rem]">
              <ChatComponent playersData={playersData} />
            </div>
          )}
        </div>
      </>
    );
  }
};
export default Planner;
