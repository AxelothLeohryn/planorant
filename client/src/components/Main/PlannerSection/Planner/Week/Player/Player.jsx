import React, { useState, useEffect } from "react";
import axios from "axios";
import AgentSelector from "./AgentSelector/AgentSelector";

const Player = ({ playerData, weekId, onAvailabilityChange }) => {
  const [availableTHU, setAvailableTHU] = useState(null);
  const [availableSAT, setAvailableSAT] = useState(null);
  const [availableSUN, setAvailableSUN] = useState(null);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(`/api/player/${playerData._id}`);
        const week = response.data.weeks.find(
          (week) => week.week.toString() === weekId
        );
        if (week) {
          setAvailableTHU(week.availableTHU);
          setAvailableSAT(week.availableSAT);
          setAvailableSUN(week.availableSUN);
        } else {
          // If no availability data found for the week, set state to null (yellow)
          setAvailableTHU(null);
          setAvailableSAT(null);
          setAvailableSUN(null);
        }
      } catch (error) {
        console.error("Error fetching availability:", error);
        // Handle error
      }
    };

    fetchAvailability();
  }, [playerData._id, weekId]);

  const toggleAvailability = async (day) => {
    let updatedState;
    switch (day) {
      case "THU":
        updatedState =
          availableTHU === true ? false : availableTHU === false ? null : true; // Cycle through the states
        setAvailableTHU(updatedState);
        break;
      case "SAT":
        updatedState =
          availableSAT === true ? false : availableSAT === false ? null : true; // Cycle through the states
        setAvailableSAT(updatedState);
        break;
      case "SUN":
        updatedState =
          availableSUN === true ? false : availableSUN === false ? null : true; // Cycle through the states
        setAvailableSUN(updatedState);
        break;
      default:
        break;
    }

    try {
      // Find the index of the week with the given weekId
      const weekIndex = playerData.weeks.findIndex(
        (week) => week.week.toString() === weekId
      );

      if (weekIndex !== -1) {
        // Update the availability for the specified day in the found week
        const updatedWeek = {
          ...playerData.weeks[weekIndex],
          [`available${day}`]: updatedState,
        };
        // Update the player's data with the modified week
        playerData.weeks[weekIndex] = updatedWeek;
        await axios.put(`/api/player/edit/${playerData._id}`, playerData);
        onAvailabilityChange(); 
      } else {
        // Handle case where week is not found
        console.error("Week not found for the provided weekId:", weekId);
      }
    } catch (error) {
      // Handle error in updating availability
      console.error("Error updating availability:", error);
    }
  };

  return (
    <article className="flex flex-col md:flex-row flex-wrap items-center justify-start md:justify-between gap-2 md:gap-4 px-4 ml-1 md:ml-7 bg-backgroundSecondary hover:bg-border border border-border roundedd">
      <div className="flex flex-row w-full pt-4 md:pt-0 md:w-2/3 items-center justify-between gap-3 md:gap-4">
        <div className="flex items-center justify-center gap-4">
          <div className="avatar md:avatar-xl">
            {/* <img src={playerData.image} alt={`${playerData.username} avatar`} /> */}
            <p className="text-xl text-primary">
              {playerData.username.slice(0, 2)}
            </p>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-nowrap">
            {playerData.username}
          </h3>
        </div>
        {/* <div className="flex justify-start items-center gap-6 md:w-96"> */}
        <div className="flex w-1/2">
          <AgentSelector playerData={playerData} weekId={weekId} />
        </div>
        {/* </div> */}
      </div>
      <div className="m-auto md:m-2 md:mr-3 text-nowrap">
        <div className="flex gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              className={`size-9 rounded-full ${
                availableTHU === true
                  ? "bg-green-500" // Day is available
                  : availableTHU === false
                  ? "bg-red-500" // Day is unavailable
                  : "bg-yellow-500" // No availability detected
              }`}
              onClick={() => toggleAvailability("THU")}
            ></button>
            <p className="text-sm md:text-base">THU</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              className={`size-9 rounded-full ${
                availableSAT === true
                  ? "bg-green-500" // Day is available
                  : availableSAT === false
                  ? "bg-red-500" // Day is unavailable
                  : "bg-yellow-500" // No availability detected
              }`}
              onClick={() => toggleAvailability("SAT")}
            ></button>
            <p className="text-sm md:text-base">SAT</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              className={`size-9 rounded-full ${
                availableSUN === true
                  ? "bg-green-500" // Day is available
                  : availableSUN === false
                  ? "bg-red-500" // Day is unavailable
                  : "bg-yellow-500" // No availability detected
              }`}
              onClick={() => toggleAvailability("SUN")}
            ></button>
            <p className="text-sm md:text-base">SUN</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Player;
