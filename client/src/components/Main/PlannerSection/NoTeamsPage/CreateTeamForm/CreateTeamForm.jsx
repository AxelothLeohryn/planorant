import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../../../../context/AuthContext";

const CreateTeamForm = ({ onClose }) => {
  const { userName, setTeam } = useAuth();
  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTeamInputValid, setIsTeamInputValid] = useState(true);
  const [isTagInputValid, setIsTagInputValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //Get id of the user logged in
      const playerData = await axios.get(`/api/player/username/${userName}`);
      // console.log(playerData.data._id);
      const userId = playerData.data._id;
      //Create a team and add the user to it
      const response = await axios.post("/api/team/create", {
        name: teamName,
        tag: teamTag,
        players: [userId],
      });
      const teamId = response.data.team._id;
      //Add the team to the user
      await axios.put(`/api/player/edit/${userId}`, {
        team: teamId,
      });
      setTeam(teamId);
      setIsLoading(false);
      toast.success(`Team ${teamName} created.`);
      onClose();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleTeamInputChange = (e) => {
    const inputValue = e.target.value;
    setTeamName(inputValue);
    setIsTeamInputValid(inputValue.length >= 5 && inputValue.length <= 15);
  };
  const handleTagInputChange = (e) => {
    const inputValue = e.target.value;
    setTeamTag(inputValue);
    setIsTagInputValid(inputValue.length >= 1 && inputValue.length <= 5);
  };

  return (
    <>
      <form id="create-team-form" onSubmit={handleSubmit}>
        <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold">CREATE YOUR TEAM</h1>
          </div>
          <div className="form-group">
            <div className="form-field">
              <label htmlFor="team-name-input" className="form-label"></label>
              <input
                id="team-name-input"
                placeholder="TEAM NAME"
                type="text"
                className={`input rounded-none max-w-full ${
                  !isTeamInputValid ? "invalid:border-red-900" : ""
                } transition`}
                minLength={5}
                maxLength={15}
                onChange={handleTeamInputChange}
              />
              {!isTeamInputValid && (
                <p className="text-red-8 text-sm absolute top-[150px]">
                  5-15 CHARACTER LIMIT
                </p>
              )}
            </div>
          </div>
          <div className="form-group">
            <div className="form-field">
              <label htmlFor="team-tag-input" className="form-label"></label>
              <input
                id="team-tag-input"
                placeholder="TEAM TAG"
                type="text"
                className={`input rounded-none max-w-full ${
                  !isTagInputValid ? "invalid:border-red-900" : ""
                } transition`}
                minLength={1}
                maxLength={5}
                onChange={handleTagInputChange}
              />
              {!isTagInputValid && (
                <p className="text-red-8 text-sm absolute top-[220px]">
                  1-5 CHARACTER LIMIT
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <button type="submit" className="btn btn-primary btn-block bg-red-7 hover:bg-red-8">
            CONFIRM
          </button>

          <label htmlFor="modal-create-team" className="btn btn-block hover:bg-border">
            CANCEL
          </label>
        </div>
      </form>
    </>
  );
};

export default CreateTeamForm;
