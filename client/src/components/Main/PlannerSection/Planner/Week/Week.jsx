import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteWeekComponent from "./DeleteWeekComponent/DeleteWeekComponent";

const Week = ({ weekId, teamData, playersData, refresh }) => {
  const [weekData, setWeekData] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

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
              <div className="avatar -translate-x-5 size-[7rem] md:size-[7rem] avatar-squared aspect-square -rotate-3">
                <img
                  src={LoadingScreens[weekData.map]}
                  alt={`${weekData.map} loading screen`}
                />
              </div>
              <h3 className="hidden md:flex">
                {weekData.weekName ? weekData.weekName : null}
              </h3>
            </div>
            <div className="flex flex-row-reverse md:flex-row gap-5 md:gap-10">
              <a
                className="link link-primary mr-3 md:mr-0"
                href={weekData.valoplant}
              >
                Valoplant
              </a>
              <div className="flex gap-4 flex-col md:flex-row md:gap-10 my-4 text-nowrap md:mr-16">
                {weekData.weekdays ? (
                  <>
                    {/* Thursday */}
                    <div className="flex items-center">
                      <span className="mr-1">
                        THU {weekData.weekdays.thursday.slice(-2)}/
                        {weekData.weekdays.thursday.slice(5, 7)}
                      </span>
                      <span className="dot dot-success"></span>
                    </div>

                    {/* Saturday */}
                    <div className="flex items-center">
                      <span className="mr-1">
                        SAT {weekData.weekdays.saturday.slice(-2)}/
                        {weekData.weekdays.saturday.slice(5, 7)}
                      </span>
                      <span className="dot dot-warning"></span>
                    </div>

                    {/* Sunday */}
                    <div className="flex items-center">
                      <span className="mr-1">
                        SUN {weekData.weekdays.sunday.slice(-2)}/
                        {weekData.weekdays.sunday.slice(5, 7)}
                      </span>
                      <span className="dot dot-error"></span>
                    </div>
                  </>
                ) : null}
              </div>
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
          <div className="accordion-content">
            <div className="min-h-0">
              {teamData.players.map((player) => (
                <p>{player}</p>
              ))}
            </div>
          </div>
        </article>
      </>
    );
};

export default Week;
