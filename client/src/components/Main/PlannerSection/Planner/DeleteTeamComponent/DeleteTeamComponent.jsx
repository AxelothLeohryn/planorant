import React from "react";

const DeleteTeamComponent = ({ teamData, handleDeleteTeam }) => {
  return (
    <section>
      <label className="link link-error" htmlFor="modal-delete-team">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
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
          <h2 className="text-xl text-content1">{`Delete ${teamData.name}?`}</h2>
          <span>
            Are you sure you want to delete this team?
            <p className="text-xs text-gray-500">
              This action cannot be undone.
            </p>
          </span>
          <div className="flex gap-3">
            <button
              onClick={handleDeleteTeam}
              className="btn btn-block bg-primary"
            >
              Delete
            </button>
            <label htmlFor="modal-delete-team" className="btn btn-block">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteTeamComponent;
