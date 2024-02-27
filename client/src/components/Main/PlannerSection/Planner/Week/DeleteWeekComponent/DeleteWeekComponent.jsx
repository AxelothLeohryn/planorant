import React from "react";

const DeleteWeekComponent = ({ weekName, handleDeleteWeek }) => {
  return (
    <section>
      <label className="link link-error" htmlFor="modal-delete-week">
        Delete Week
      </label>
      <input className="modal-state" id="modal-delete-week" type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-delete-week"></label>
        <div className="modal-content flex flex-col gap-5">
          <label
            htmlFor="modal-delete-week"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </label>
          <h2 className="text-xl">{`Delete ${weekName} ?`}</h2>
          <span>
            Are you sure you want to delete this week?
            <p className="text-xs text-gray-500">
              This action cannot be undone.
            </p>
          </span>
          <div className="flex gap-3">
            <button
              onClick={handleDeleteWeek}
              className="btn btn-block bg-red-7"
            >
              Delete
            </button>
            <label htmlFor="modal-delete-week" className="btn btn-block">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteWeekComponent;
