import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../../context/AuthContext";

const CreateTeamForm = ({ onClose }) => {
  const { userName, setTeam } = useAuth();
  const [teamName, setTeamName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(teamName);
    setIsLoading(true);

    try {
      //Get id of the user logged in
      const playerData = await axios.get(`/api/player/username/${userName}`);
      console.log(playerData.data._id);
      const userId = playerData.data._id;
      //Create a team and add the user to it
      const response = await axios.post("/api/team/create", {
        name: teamName,
        players: [userId],
      });
      const teamId = response.data.team._id;
      //Add the team to the user
      await axios.put(`/api/player/edit/${userId}`, {
        team: teamId,
      });
      setTeam(teamId); 
      setIsLoading(false);
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <form id="create-team-form" onSubmit={handleSubmit}>
        <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold">
              Create your Valorant Premiere Team
            </h1>
          </div>
          <div className="form-group">
            <div className="form-field">
              <label htmlFor="team-name-input" className="form-label">
                Team name
              </label>

              <input
                id="team-name-input"
                placeholder="Type here"
                type="text"
                className="input max-w-full"
                onChange={(e) => setTeamName(e.target.value)}
              />
              {teamName.length < 3 && (
                <label
                  htmlFor="team-name-input"
                  className="form-label absolute top-[190px]"
                >
                  <span className="form-label-alt">Please enter a name.</span>
                </label>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <label htmlFor="modal-create-team" className="btn btn-block">
            Cancel
          </label>
          {teamName.length < 3 && (
            <button
              type="submit"
              disabled
              className="btn btn-error btn-block bg-red-8"
            >
              Create
            </button>
          )}
          {teamName.length > 2 &&
            (isLoading ? (
              <button
                type="submit"
                className="btn btn-loading btn-block bg-red-8"
                disabled
              >
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary btn-block bg-red-8"
              >
                Create
              </button>
            ))}
        </div>
      </form>
    </>
  );
};

export default CreateTeamForm;
