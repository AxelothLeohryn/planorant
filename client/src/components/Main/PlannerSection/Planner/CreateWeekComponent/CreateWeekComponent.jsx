import React, { useState } from "react";
import CreateWeekForm from "./CreateWeekForm/CreateWeekForm";

const CreateWeekComponent = ( {team, teamData, toggleRefresh}) => {
  const [isCreateWeekOpen, setIsCreateWeekOpen] = useState(false);

  const toggleWeekModal = () => setIsCreateWeekOpen(!isCreateWeekOpen);

  return (
    <section className="flex flex-col items-center mt-8">
      <button
        type="button"
        onClick={toggleWeekModal}
        className="gap-1 flex items-center justify-center transition btn btn-primary btn-xl bg-primary hover:bg-red-8 duration-100 mb-5"
      >
        Add a Premier Week
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="w-6 h-6 relative bottom-[2px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <input
        className="modal-state"
        id="modal-create-team"
        type="checkbox"
        checked={isCreateWeekOpen}
        onChange={() => setIsCreateWeekOpen(!isCreateWeekOpen)}
      />
      {isCreateWeekOpen && (
        <div className="modal">
          <label className="modal-overlay" htmlFor="modal-create-team" onClick={toggleWeekModal}></label>
          <div className="modal-content">
            <button
              onClick={toggleWeekModal}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <CreateWeekForm
              team={team}
              teamData={teamData}
              onClose={toggleWeekModal}
              toggleRefresh={toggleRefresh}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default CreateWeekComponent;
