import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from 'framer-motion';

const AgentSelector = ({ playerData, weekId }) => {
  const [selectedAgents, setSelectedAgents] = useState(
    playerData.weeks.find((w) => w.week.toString() === weekId)?.agents || []
  );
  const [showSelector, setShowSelector] = useState(false);
  

  const selectorRef = useRef(null);

  const allAgents = [
    { id: "astra", name: "Astra", image: "/agent-icons/Astra_icon.webp" },
    { id: "breach", name: "Breach", image: "/agent-icons/Breach_icon.webp" },
    { id: "brimstone", name: "Brimstone", image: "/agent-icons/Brimstone_icon.webp" },
    { id: "chamber", name: "Chamber", image: "/agent-icons/Chamber_icon.webp" },
    { id: "cypher", name: "Cypher", image: "/agent-icons/Cypher_icon.webp" },
    {
      id: "deadlock",
      name: "Deadlock",
      image: "/agent-icons/Deadlock_icon.webp",
    },
    { id: "fade", name: "Fade", image: "/agent-icons/Fade_icon.webp" },
    { id: "gekko", name: "Gekko", image: "/agent-icons/Gekko_icon.webp" },
    {id: "harbor", name: "Harbor", image: "/agent-icons/Harbor_icon.webp"},
    {id: "iso", name: "Iso", image: "/agent-icons/Iso_icon.webp"},
    { id: "jett", name: "Jett", image: "/agent-icons/Jett_icon.webp" },
    { id: "kayo", name: "KAY/O", image: "/agent-icons/KAYO_icon.webp" },
    { id: "killjoy", name: "Killjoy", image: "/agent-icons/Killjoy_icon.webp" },
    { id: "neon", name: "Neon", image: "/agent-icons/Neon_icon.webp" },
    { id: "omen", name: "Omen", image: "/agent-icons/Omen_icon.webp" },
    { id: "phoenix", name: "Phoenix", image: "/agent-icons/Phoenix_icon.webp" },
    { id: "raze", name: "Raze", image: "/agent-icons/Raze_icon.webp" },
    { id: "reyna", name: "Reyna", image: "/agent-icons/Reyna_icon.webp" },
    { id: "sage", name: "Sage", image: "/agent-icons/Sage_icon.webp" },
    { id: "skye", name: "Skye", image: "/agent-icons/Skye_icon.webp" },
    { id: "sova", name: "Sova", image: "/agent-icons/Sova_icon.webp" },
    { id: "viper", name: "Viper", image: "/agent-icons/Viper_icon.webp" },
    { id: "yoru", name: "Yoru", image: "/agent-icons/Yoru_icon.webp" },
  ];

  // Function to close popover if clicked outside
  const handleClickOutside = (event) => {
    if (selectorRef.current && !selectorRef.current.contains(event.target)) {
      setShowSelector(false);
    }
  };

  //Update player data with new agents in DB
  const updatePlayerAgents = async (agentIds) => {
    try {
      // We assume agentIds is already an array of strings (agent IDs)
      const updatedWeeks = playerData.weeks.map((week) =>
        week.week === weekId ? { ...week, agents: agentIds } : week
      );

      const updatedPlayerData = {
        ...playerData,
        weeks: updatedWeeks,
      };

      await axios.put(`/api/player/edit/${playerData._id}`, updatedPlayerData);
    } catch (error) {
      console.error("Error updating player agents:", error);
    }
  };

  const addAgent = (agent) => {
    // Since we are adding an agent, we create a new array with the new agent's ID added
    const newAgents = [...selectedAgents, agent.id];
    setSelectedAgents(newAgents);
    updatePlayerAgents(newAgents); // Pass the array of IDs to the update function
    setShowSelector(false); // Close the selector after adding
  };

  const removeAgent = (agent) => {
    // When removing, we filter out the agent's ID
    const newAgents = selectedAgents.filter((id) => id !== agent.id);
    setSelectedAgents(newAgents);
    updatePlayerAgents(newAgents); // Pass the updated array of IDs
  };

  // Effect to add event listener to document
  useEffect(() => {
    // Only add listener if popover is shown
    if (showSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener on dismount or if popover is hidden
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSelector]);

  // Adjust position if it goes beyond the page's bottom
  useEffect(() => {
    if (showSelector && selectorRef.current) {
      const margin = 100; // Margin from the bottom of the viewport
      const { bottom } = selectorRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (bottom > viewportHeight) {
        const overflowHeight = bottom - viewportHeight + margin;
        selectorRef.current.style.transform = `translateY(-${overflowHeight}px)`;
      } else {
        selectorRef.current.style.transform = "none";
      }
    }
  }, [showSelector, selectedAgents]); // Re-run this effect when showSelector changes or selectedAgents changes

  return (
    <>
      <div className="flex flex-wrap md:gap-4 relative">
        {selectedAgents.map((agentId, index) => {
          const agent = allAgents.find((a) => a.id === agentId);
          return (
            <div
              key={index}
              className="avatar md:avatar-xl rounded-full border-2 border-content2"
            >
              <img src={agent.image} alt={agent.name} />
              <button
                onClick={() => removeAgent(agent)}
                className="absolute -top-1 -right-2 bg-border text-white rounded-full size-5 hover:scale-125 transition duration-150 flex items-center justify-center text-xs z-20"
                aria-label={`Remove ${agent.name}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-3 md:size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          );
        })}
        {selectedAgents.length < 3 && (
          <button
            className="avatar md:avatar-xl rounded-full overflow-hidden bg-backgroundSecondary flex items-center justify-center "
            onClick={() => setShowSelector(!showSelector)}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
          </button>
        )}
      </div>
      {showSelector && (
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-x-0 md:left-[28%] max-w-[420px] px-4 z-50"
        ref={selectorRef}
      >
          <div className="flex flex-col bg-backgroundSecondary border-border rounded-xl shadow-lg z-50 max-h-96 overflow-y-scroll hide-scrollbar">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-5 top-2"
              onClick={() => setShowSelector(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="p-4">
              {allAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center gap-2 p-2 hover:bg-content3 rounded cursor-pointer"
                  onClick={() => addAgent(agent)}
                >
                  <div className="avatar w-10 h-10 rounded-full overflow-hidden">
                    <img src={agent.image} alt={agent.name} />
                  </div>
                  <span className="flex-1">{agent.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AgentSelector;
