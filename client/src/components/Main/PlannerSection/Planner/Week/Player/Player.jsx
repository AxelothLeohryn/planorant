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
        updatedState = availableTHU === true ? false : true;
        setAvailableTHU(updatedState);
        break;
      case "SAT":
        updatedState = availableSAT === true ? false : true;
        setAvailableSAT(updatedState);
        break;
      case "SUN":
        updatedState = availableSUN === true ? false : true;
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
        console.error("Week not found for the provided weekId:", weekId);
        // Handle error if week is not found
      }
    } catch (error) {
      console.error("Error updating availability:", error);
      // Handle error
    }
  };

  return (
    <article className="flex flex-col md:flex-row flex-wrap items-center justify-start md:justify-between gap-4 p-4 ml-1 md:ml-7 bg-[#232323] hover:bg-border rounded">
      <div className="flex flex-row w-full md:w-fit items-center gap-4">
        <div className="avatar avatar-xl border border-content3">
          <img src={playerData.image} alt={`${playerData.username} avatar`} />
        </div>
        <div className="flex justify-between items-center gap-6">
          <h3 className="text-xl font-bold text-nowrap">
            {playerData.username}
          </h3>
          <div className="flex">
            <AgentSelector playerData={playerData} weekId={weekId} />
          </div>
        </div>
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
            <p>THU</p>
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
            <p>SAT</p>
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
            <p>SUN</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Player;
