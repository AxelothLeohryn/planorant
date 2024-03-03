import React from "react";

const LeaveTeamComponent = ({ teamData, handleLeaveTeam }) => {
  return (
    <section>
      <label className="btn hover:bg-border" htmlFor="modal-leave-team">
        Leave Team
      </label>
      <input className="modal-state" id="modal-leave-team" type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-leave-team"></label>
        <div className="modal-content flex flex-col gap-5">
          <label
            htmlFor="modal-leave-team"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl text-content1">{`Leave ${teamData.name}?`}</h2>
          <span>
            Are you sure you want to leave this team?
            <p className="text-xs text-gray-500">
              This action cannot be undone.
            </p>
          </span>
          <div className="flex gap-3">
            <button
              onClick={handleLeaveTeam}
              className="btn btn-block bg-primary"
            >
              Leave
            </button>
            <label htmlFor="modal-leave-team" className="btn btn-block">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaveTeamComponent;
