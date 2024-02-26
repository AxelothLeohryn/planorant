import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import CreateWeekForm from "./CreateWeekForm/CreateWeekForm";

import DeleteTeamComponent from "./DeleteTeamComponent/DeleteTeamComponent";

const Planner = ({ setHaveTeam }) => {
  const { team, setTeam } = useAuth();

  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembersNumber, setTeamMembersNumber] = useState(0);
  const [isCreateWeekOpen, setIsCreateWeekOpen] = useState(false);

  const [playersData, setPlayersData] = useState([]);

  const toggleWeekModal = () => setIsCreateWeekOpen(!isCreateWeekOpen);

  useEffect(() => {
    const fetchTeamData = async () => {
      setIsLoading(true);
      try {
        const teamFetchedData = await axios.get(`/api/team/${team}`);
        console.log(teamFetchedData.data);
        setTeamData(teamFetchedData.data);
        setTeamMembersNumber(teamFetchedData.data.players.length);

        // Fetch all player data in parallel using Promise.all
        const playersPromises = teamFetchedData.data.players.map((playerId) =>
          axios.get(`/api/player/${playerId}`)
        );
        const playersResponses = await Promise.all(playersPromises);

        // Extract the data from each player response
        console.log(playersResponses);
        const playersDataFetched = playersResponses.map(
          (response) => response.data
        );
        setPlayersData(playersDataFetched);
        console.log("Loading false...");
        setIsLoading(false);

        // Now if you console.log, you'll see the populated array
        console.log(playersData);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    console.log(team);
    fetchTeamData();
  }, [team]);

  const handleDeleteTeam = async () => {
    // Delete each player associated with the team
    for (const playerId of teamData.players) {
      await axios.put(`/api/player/edit/${playerId}`, {
        team: null,
      });
    }

    // Delete the team
    await axios.delete(`/api/team/delete/${team}`);

    setTeamData(null);
    setHaveTeam(false);
  };

  if (isLoading) {
    return <div className="skeleton-pulse h-24"></div>;
  } else {
    return (
      <>
        <section>
          <div className="lg:flex lg:items-center lg:justify-between bg-[#232323] p-5 rounded">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                {teamData.name}
              </h2>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {teamMembersNumber}/7 members
                </div>
                <div className="avatar-group gap-1">
                  {playersData.map((player) => (
                    <div
                      key={player.username}
                      className="popover popover-hover"
                    >
                      <label
                        className="avatar popover-trigger hover:scale-110 transiiton duration-300"
                        tabIndex="0"
                      >
                        <img className="" src={player.image} alt="avatar" />
                      </label>
                      <div className="popover-content w-fit px-5">
                        <div className="popover-arrow"></div>
                        <p className="text-sm text-center">{player.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {teamData.key}
                </div>
              </div>
            </div>
            <DeleteTeamComponent
              teamData={teamData}
              handleDeleteTeam={handleDeleteTeam}
            />
          </div>
        </section>
      </>
    );
  }
};
export default Planner;
