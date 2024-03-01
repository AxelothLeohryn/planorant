import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import CreateTeamForm from "./CreateTeamForm/CreateTeamForm";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const NoTeamsPage = ({ setHaveTeam }) => {
  const { userName, setTeam } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      // Get id of the user logged in
      const playerData = await axios.get(`/api/player/username/${userName}`);
      // Get the team that has the key of the invite code
      const teamData = await axios.get(`/api/team/key/${inviteCode}`);

      // Add the team to the user
      await axios.put(`/api/player/edit/${playerData.data._id}`, {
        team: teamData.data._id,
      });

      // Add the user to the team
      await axios.put(`/api/team/edit/${teamData.data._id}`, {
        players: [...teamData.data.players, playerData.data._id],
      });

      // Collect all week IDs from the team
      const weekIds = teamData.data.weeks;

      // Add the weeks of the team to the user
      await axios.put(`/api/player/edit/${playerData.data._id}`, {
        weeks: [
          ...playerData.data.weeks,
          ...weekIds.map((weekId) => ({ week: weekId })),
        ],
      });

      toast.success(`You have joined the team: ${teamData.data.name}`);
      // Update team status to refresh the PlannerComponent
      setHaveTeam(true);
    } catch (error) {
      toast.error(`No team found with the invite code: ${inviteCode}`);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center mt-8">
        <button
          type="button"
          onClick={toggleModal}
          className="gap-1 flex items-center justify-center btn btn-primary btn-xl hover:scale-110 transition duration-100"
        >
          Create a Team

        </button>
        <input
          className="modal-state"
          id="modal-create-team"
          type="checkbox"
          checked={isModalOpen}
          onChange={() => setIsModalOpen(!isModalOpen)}
        />
        {isModalOpen && (
          <div className="modal w-screen h-screen">
            <label className="modal-overlay" onClick={toggleModal}></label>
            <div className="modal-content p-10 flex flex-col gap-5 max-w-3xl">
              <button
                onClick={toggleModal}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
              <CreateTeamForm onClose={toggleModal} />
            </div>
          </div>
        )}
      </section>
      <div className="max-w-96 mx-auto divider divider-horizontal">OR</div>
      <section>
        <form
          onChange={(e) => setInviteCode(e.target.value)}
          className="flex flex-row items-end w-full max-w-sm gap-6 mx-auto"
        >
          <div className="form-group">
            <div className="form-field">
              <label className="form-label">Join a Team</label>

              <input
                placeholder="Team Code"
                type="text"
                className="max-w-full input focus:border-red-7 transition"
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleJoin}
              className="gap-2 transition btn btn-primary  hover:bg-red-8 hover:translate-x-1 duration-100"
            >
              Join
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NoTeamsPage;
