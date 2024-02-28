import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteWeekComponent from "./DeleteWeekComponent/DeleteWeekComponent";
import Player from "./Player/Player";

const Week = ({ weekId, teamData, playersData, refresh }) => {
  const [weekData, setWeekData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dayAvailability, setDayAvailability] = useState({
    THU: "dot-warning",
    SAT: "dot-warning",
    SUN: "dot-warning",
  });
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const LoadingScreens = {
    Ascent: "./map-loading-screens/Loading_Screen_Ascent.webp",
    Bind: "./map-loading-screens/Loading_Screen_Bind.webp",
    Breeze: "./map-loading-screens/Loading_Screen_Breeze.webp",
    Fracture: "./map-loading-screens/Loading_Screen_Fracture.webp",
    Haven: "./map-loading-screens/Loading_Screen_Haven.webp",
    Icebox: "./map-loading-screens/Loading_Screen_Icebox.webp",
    Lotus: "./map-loading-screens/Loading_Screen_Lotus.webp",
    Pearl: "./map-loading-screens/Loading_Screen_Pearl.webp",
    Split: "./map-loading-screens/Loading_Screen_Split.webp",
    Sunset: "./map-loading-screens/Loading_Screen_Sunset.webp",
  };

  const handleDeleteWeek = async () => {
    // Delete the week from each player
    for (const playerId of teamData.players) {
      const player = await axios.get(`/api/player/${playerId}`);
      const playerDetails = player.data;
      await axios.put(`/api/player/edit/${playerId}`, {
        weeks: playerDetails.weeks.filter((week) => week.week !== weekId),
      });
    }
    // Delete the week from the team
    await axios.put(`/api/team/edit/${teamData._id}`, {
      weeks: teamData.weeks.filter((week) => week !== weekId),
    });

    //Delete the week
    await axios.delete(`/api/week/delete/${weekId}`);
    refresh();
  };
  const refreshComponent = () => {
    setRefreshTrigger(prev => !prev); // Toggle the state to force re-render
  };

  useEffect(() => {
    //Get week data
    const fetchWeekData = async () => {
      try {
        const response = await axios.get(`/api/week/${weekId}`);
        setWeekData(response.data);
      } catch (error) {
        console.error("Error fetching week data:", error);
      }
    };
    fetchWeekData();
  }, [weekId]);

  //Check player availability for the week
  useEffect(() => {
    if (playersData && playersData.length > 0) {
      const availabilityCount = {
        THU: { available: 0, unavailable: 0 },
        SAT: { available: 0, unavailable: 0 },
        SUN: { available: 0, unavailable: 0 },
      };

      playersData.forEach((player) => {
        const playerWeek = player.weeks.find(
          (week) => week.week.toString() === weekId
        );
        if (playerWeek) {
          if (playerWeek.availableTHU !== undefined) {
            availabilityCount.THU.available += playerWeek.availableTHU ? 1 : 0;
            availabilityCount.THU.unavailable += playerWeek.availableTHU
              ? 0
              : 1;
          }
          if (playerWeek.availableSAT !== undefined) {
            availabilityCount.SAT.available += playerWeek.availableSAT ? 1 : 0;
            availabilityCount.SAT.unavailable += playerWeek.availableSAT
              ? 0
              : 1;
          }
          if (playerWeek.availableSUN !== undefined) {
            availabilityCount.SUN.available += playerWeek.availableSUN ? 1 : 0;
            availabilityCount.SUN.unavailable += playerWeek.availableSUN
              ? 0
              : 1;
          }
        }
      });


      const calculateAvailability = (available, unavailable) => {
        if (available >= 5) return "dot-success";
        if (unavailable >= 3) return "dot-error";
        return "dot-warning"; // Default to yellow if undecided
      };

      const dayAvailabilities = {
        THU: calculateAvailability(
          availabilityCount.THU.available,
          availabilityCount.THU.unavailable
        ),
        SAT: calculateAvailability(
          availabilityCount.SAT.available,
          availabilityCount.SAT.unavailable
        ),
        SUN: calculateAvailability(
          availabilityCount.SUN.available,
          availabilityCount.SUN.unavailable
        ),
      };


      setDayAvailability(dayAvailabilities);
    }
  }, [playersData, weekId, refreshTrigger]);

  if (weekData)
    return (
      <>
        <article
          className="my-4 accordion "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            type="checkbox"
            id={`accordion-${weekData._id}`}
            className="accordion-toggle"
          />
          {/* {The actual content of the week card is in the label} */}
          <label
            htmlFor={`accordion-${weekData._id}`}
            className="accordion-title flex-row items-center justify-between gap-4 p-0 bg-[#232323] hover:bg-border rounded "
          >
            {/* <button className=" [&>*>*]:text-xs [&>*>*]:text-red-8 mr-5 absolute -right-3 bottom-2 md:hidden hover:scale-110 transition-transform duration-300 ease-in-out">
              <DeleteWeekComponent
                weekName={weekData.weekName}
                handleDeleteWeek={handleDeleteWeek}
              />
            </button> */}
            <div className="flex items-center justify-center gap-4">
              <div className="avatar -translate-x-2 md:-translate-x-5 size-[8rem] md:size-[7rem] avatar-squared aspect-square -rotate-3">
                <img
                  src={LoadingScreens[weekData.map]}
                  alt={`${weekData.map} loading screen`}
                />
              </div>
              <h3 className="hidden sm:flex text-nowrap">
                {weekData.weekName ? weekData.weekName : null}
              </h3>
            </div>
            <div className="flex flex-row gap-5 md:gap-10 md:flex-row-reverse">
              <div className="flex gap-4 flex-col text-base md:flex-row md:gap-10 md:mr-8 my-4 text-nowrap">
                {weekData.weekdays && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="mr-1">
                        THU {weekData.weekdays.thursday.slice(-2)}/
                        {weekData.weekdays.thursday.slice(5, 7)}
                      </span>
                      <span className={`dot size-3 -translate-y-0.5 ${dayAvailability.THU}`}></span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">
                        SAT {weekData.weekdays.saturday.slice(-2)}/
                        {weekData.weekdays.saturday.slice(5, 7)}
                      </span>
                      <span className={`dot size-3 -translate-y-0.5 ${dayAvailability.SAT}`}></span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">
                        SUN {weekData.weekdays.sunday.slice(-2)}/
                        {weekData.weekdays.sunday.slice(5, 7)}
                      </span>
                      <span className={`dot size-3 -translate-y-0.5 ${dayAvailability.SUN}`}></span>
                    </div>
                  </>
                )}
              </div>
              <a
                className="link link-primary mr-3 md:mr-8"
                href={weekData.valoplant}
                target="_blank"
                rel="noreferrer"
              >
                <p>Valoplant</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-[0.85rem] ml-2 -translate-y-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
            </div>

            <div
              style={{ visibility: isHovered ? "visible" : "hidden" }}
              className="[&>*>*]:text-xs [&>*>*]:text-red-8 mr-5 absolute -right-3 top-3 md:flex"
            >
              <DeleteWeekComponent
                weekName={weekData.weekName}
                handleDeleteWeek={handleDeleteWeek}
              />
            </div>
          </label>
          {/* The content inside the card when clicked is inside this div accordion-content */}
          <div className="accordion-content !pt-0">
            <div className="min-h-0">
              {playersData.map((player) => (
                <Player
                  playerData={player}
                  weekId={weekId}
                  key={player.email}
                  onAvailabilityChange={refreshComponent}
                />
              ))}
            </div>
          </div>
        </article>
      </>
    );
};

export default Week;
