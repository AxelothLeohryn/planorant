import React, { useEffect, useState } from "react";
import DeleteTeamComponent from "../DeleteTeamComponent";
import { useAuth } from "../../../../../context/AuthContext";
import axios from "axios";
import Week from "../Week/Week";

const Team = ({
  teamMembersNumber,
  teamData,
  playersData,
  handleDeleteTeam,
  toggleRefresh,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <section
        className="max-w-[1920px] mx-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex-row flex-nowrap md:flex md:items-center md:justify-between bg-backgroundSecondary p-5 border border-border rounded">
          <div className="min-w-0  mb-2">
            <h2 className="text-2xl font-bold leading-7 text-content1 sm:truncate sm:text-3xl sm:tracking-tight">
              {teamData.name}{" "}
              <span className="text-2xl font-bold leading-7 text-content2 sm:truncate sm:text-xl sm:tracking-tight">
                #{teamData.tag}
              </span>
            </h2>
            <div className="mt-2 flex flex-col sm:items-end sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="flex flex-col">
                <div className="avatar-group gap-1 mb-2">
                  {playersData.map((player) => (
                    <div key={player.username} className="popover-hover">
                      <label
                        className="avatar my-2 popover-trigger hover:scale-110 transition duration-300"
                        tabIndex="0"
                      >
                        {/* <img className="" src={player.image} alt="avatar" /> */}
                        <p className="text-lg text-primary">{player.username.slice(0,2)}</p>
                      </label>
                      <div className="popover-content w-fit px-5">
                        <div className="popover-arrow"></div>
                        <p className="text-sm text-center">{player.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-sm text-content2 gap-4 mb-2 md:mb-0">
                  <div className="flex items-center justify-center">

                  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-1.5 h-5 w-5 flex-shrink-0 text-content2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {teamMembersNumber}/7 members
                  </div>
                  <div className="flex items-center text-sm text-content2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-content2"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {teamData.key}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{ visibility: isHovered ? "visible" : "hidden" }}
            className="[&>*>label]:text-primary mr-5 absolute -right-3 top-3 md:flex"
          >
            <DeleteTeamComponent
              teamData={teamData}
              handleDeleteTeam={handleDeleteTeam}
            />
          </div>
        </div>
      </section>
      <section className="ml-3 md:ml-5 my-4">
        {teamData.weeks.map((week, index) => (
          <Week
            key={index}
            weekId={week}
            teamData={teamData}
            playersData={playersData}
            toggleRefresh={toggleRefresh}
          />
        ))}
      </section>
    </>
  );
};

export default Team;
