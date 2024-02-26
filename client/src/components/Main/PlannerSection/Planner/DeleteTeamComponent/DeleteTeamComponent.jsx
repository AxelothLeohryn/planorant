import React from "react";

const DeleteTeamComponent = ({ teamData, handleDeleteTeam }) => {
  
  return (
    <section>
      <label className="link link-error" htmlFor="modal-delete-team">
        Delete Team
      </label>
      <input className="modal-state" id="modal-delete-team" type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-delete-team"></label>
        <div className="modal-content flex flex-col gap-5">
          <label
            htmlFor="modal-delete-team"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">{`Delete ${teamData.name} ?`}</h2>
          <span>
            Are you sure you want to delete this team?
            <p className="text-xs text-gray-500">
              This action cannot be undone.
            </p>
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
  );
};

export default DeleteTeamComponent;
