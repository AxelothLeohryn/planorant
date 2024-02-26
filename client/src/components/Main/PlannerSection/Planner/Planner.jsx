import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import axios from "axios";
import CreateWeekForm from "./CreateWeekForm/CreateWeekForm";

const Planner = ({ setHaveTeam }) => {
  const { team, setTeam } = useAuth();
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teamMembersNumber, setTeamMembersNumber] = useState(0);

  const [isCreateWeekOpen, setIsCreateWeekOpen] = useState(false);

  const toggleWeekModal = () => setIsCreateWeekOpen(!isCreateWeekOpen);

  useEffect(() => {
    const fetchTeamData = async () => {
      const teamFetchedData = await axios.get(`/api/team/${team}`);
      console.log(teamFetchedData.data);
      setTeamData(teamFetchedData.data);
      setTeamMembersNumber(teamFetchedData.data.players.length);
      setIsLoading(false);
    };
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
        <section className="card">
          <div className="card-body">{teamData.name}</div>
          <div className="card-body">{teamData.key}</div>
          <div className="card-body">{teamMembersNumber}/7 members</div>
          <section className="flex flex-col items-center mt-8">
            <button
              type="button"
              onClick={toggleWeekModal}
              className="gap-4 transition btn btn-primary btn-xl bg-red-8 hover:bg-red-600 duration-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-row-insert-bottom"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1z" />
                <path d="M12 15l0 4" />
                <path d="M14 17l-4 0" />
              </svg>
              Add Premiere Week
            </button>
            <input
              className="modal-state"
              id="modal-create-team"
              type="checkbox"
              checked={isCreateWeekOpen}
              onChange={() => setIsCreateWeekOpen(!isCreateWeekOpen)}
            />
            {isCreateWeekOpen && (
              <div className="modal w-screen h-screen">
                <label
                  className="modal-overlay"
                  onClick={toggleWeekModal}
                ></label>
                <div className="modal-content flex flex-col gap-5 max-w-3xl">
                  <button
                    onClick={toggleWeekModal}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </button>
                  <CreateWeekForm onClose={toggleWeekModal} />
                </div>
              </div>
            )}
          </section>
        </section>
        <section>
          <label className="link link-error" htmlFor="modal-delete-team">
            Delete Team
          </label>
          <input
            className="modal-state"
            id="modal-delete-team"
            type="checkbox"
          />
          <div className="modal">
            <label
              className="modal-overlay"
              htmlFor="modal-delete-team"
            ></label>
            <div className="modal-content flex flex-col gap-5">
              <label
                htmlFor="modal-delete-team"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
              <h2 className="text-xl">Modal title 1</h2>
              <span>
                Are you sure you want to delete this team? This action cannot be
                undone.
              </span>
              <div className="flex gap-3">
                <label htmlFor="modal-delete-team" className="btn btn-block">
                  Cancel
                </label>
                <button
                  onClick={handleDeleteTeam}
                  className="btn btn-block bg-red-7"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};
export default Planner;
