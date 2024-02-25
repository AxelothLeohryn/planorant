import React from "react";
import { useAuth } from "../../../context/AuthContext";

const Planner = () => {
  return (
    <>
      <section className="flex flex-col items-center mt-8">
        <button className="gap-4 transition btn btn-primary btn-xl bg-red-8 hover:bg-red-600 duration-100">
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
          Create a Team
        </button>
      </section>
      <div className="w-40 mx-auto divider divider-horizontal">OR</div>
      <section>
        <form className="flex flex-row items-end w-full max-w-sm gap-6 mx-auto">
          <div className="form-group">
            <div className="form-field">
              <label className="form-label">Join a Team</label>

              <input
                placeholder="Team Code"
                type="email"
                className="max-w-full input"
              />
            </div>
          </div>
          <div className="">
            <button className="gap-2 transition btn btn-primary bg-backgroundSecondary hover:bg-red-600 duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus size-6"
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
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
              Join
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Planner;
