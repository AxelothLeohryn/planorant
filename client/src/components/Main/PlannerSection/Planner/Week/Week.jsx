import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteWeekComponent from "./DeleteWeekComponent/DeleteWeekComponent";

const Week = ({ weekId, teamData, refresh }) => {
  const [weekData, setWeekData] = useState(null);

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
        <article className="my-4 accordion">
          <input
            type="checkbox"
            id={`accordion-${weekData._id}`}
            className="accordion-toggle"
          />
          <label
            htmlFor={`accordion-${weekData._id}`}
            className="accordion-title w-full flex-row items-center justify-start gap-4 p-0 bg-[#232323] rounded"
          >
            <div className="avatar size-[7rem] avatar-squared -rotate-2">
              <img
                src={LoadingScreens[weekData.map]}
                alt={`${weekData.map} loading screen`}
              />
            </div>
            {weekData.weekName ? weekData.weekName : null}
            <DeleteWeekComponent
              weekName={weekData.name}
              handleDeleteWeek={handleDeleteWeek}
            />
          </label>
          <div className="accordion-content">
            <div className="min-h-0">MEMBERS</div>
          </div>
        </article>
      </>
    );
};

export default Week;
