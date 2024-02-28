import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { DatePicker } from "@mui/x-date-pickers";
import { createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { set } from "mongoose";

const CreateWeekForm = ({ team, teamData, onClose, refresh }) => {
  const [season, setSeason] = useState("");
  const [weekName, setWeekName] = useState("");
  const [map, setMap] = useState("");
  const [thursday, setThursday] = useState(null);
  const [saturday, setSaturday] = useState(null);
  const [sunday, setSunday] = useState(null);
  const [valoplant, setValoplant] = useState("");

  const [isSeasonInputValid, setIsSeasonInputValid] = useState(true);
  const [isWeekInputValid, setIsWeekInputValid] = useState(true);
  const [isMapInputValid, setIsMapInputValid] = useState(true);
  const [isThursdayInputValid, setIsThursdayInputValid] = useState(true);
  const [isSaturdayInputValid, setIsSaturdayInputValid] = useState(true);
  const [isSundayInputValid, setIsSundayInputValid] = useState(true);
  const [isValoplantInputValid, setIsValoplantInputValid] = useState(true);

  const maps = [
    "Bind",
    "Haven",
    "Split",
    "Ascent",
    "Icebox",
    "Breeze",
    "Fracture",
    "Pearl",
    "Lotus",
    "Sunset",
  ];

  const valorantColor = createTheme({
    palette: {
      valorant: {
        main: "e74a39",
        light: "#aa2429",
        dark: "#aa2429",
        contrastText: "#ffffff",
      },
    },
  });

  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);

    try {
      //Create a week
      const response = await axios.post("/api/week/create", {
        season,
        weekName,
        map,
        weekdays: {
          thursday,
          saturday,
          sunday,
        },
        teamId: team,
        valoplant,
      });
      console.log(response);
      // Add the week to each player in the team
      for (const playerId of teamData.players) {
        const player = await axios.get(`/api/player/${playerId}`);
        const playerDetails = player.data;
        await axios.put(`/api/player/edit/${playerId}`, {
          weeks: [...playerDetails.weeks, { week: response.data.data._id }],
        });
      }
      // Add the week to the team
      console.log(teamData);
      await axios.put(`/api/team/edit/${team}`, {
        weeks: [...teamData.weeks, response.data.data._id],
      });
      //Success notification
      toast.success(`Week ${weekName} created.`);
      //Close the modal
      onClose();
      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create week.");
    }
  };

  const handleSeasonInputChange = (e) => {
    const inputValue = e.target.value;
    setSeason(inputValue);
    setIsSeasonInputValid(inputValue.length >= 5 && inputValue.length <= 15);
  };
  const handleWeekInputChange = (e) => {
    const inputValue = e.target.value;
    setWeekName(inputValue);
    setIsWeekInputValid(inputValue.length >= 5 && inputValue.length <= 15);
  };
  const handleMapInputChange = (e) => {
    const inputValue = e.target.value;
    setMap(inputValue);
    setIsMapInputValid(inputValue.length >= 5 && inputValue.length <= 15);
  };

  const handleThursdayChange = (newValue) => {
    const formattedDate = newValue
      ? dayjs(newValue).format("YYYY-MM-DD")
      : null;
    setThursday(formattedDate);
  };

  const handleSaturdayChange = (newValue) => {
    const formattedDate = newValue
      ? dayjs(newValue).format("YYYY-MM-DD")
      : null;
    setSaturday(formattedDate);
  };

  const handleSundayChange = (newValue) => {
    const formattedDate = newValue
      ? dayjs(newValue).format("YYYY-MM-DD")
      : null;
    setSunday(formattedDate);
  };

  const handleValoplantInputChange = (e) => {
    const inputValue = e.target.value;
    setValoplant(inputValue);
    setIsValoplantInputValid(inputValue.length >= 12 && inputValue.length <= 35);
  };

  // MUI Date Picker inside Button
  function ButtonField(props) {
    const {
      setOpen,
      label,
      id,
      disabled,
      InputProps: { ref } = {},
      inputProps: { "aria-label": ariaLabel } = {},
    } = props;

    return (
      <Button
        variant="outlined"
        color="error"
        id={id}
        disabled={disabled}
        ref={ref}
        aria-label={ariaLabel}
        onClick={() => setOpen?.((prev) => !prev)}
      >
        {label}
      </Button>
    );
  }
  function ButtonDatePicker(props) {
    const [open, setOpen] = React.useState(false);

    return (
      <DatePicker
        slots={{ field: ButtonField, ...props.slots }}
        slotProps={{ field: { setOpen } }}
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        showDaysOutsideCurrentMonth
      />
    );
  }

  return (
    <form id="create-team-form" onSubmit={handleSubmit}>
      {console.log(teamData.players)}
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-semibold">ADD A WEEK</h1>
        </div>
        <div className="form-group">
          <div className="form-field">
            {/* <label htmlFor="week-season-input" className="form-label"></label>
            <input
              id="week-season-input"
              placeholder="SEASON"
              type="text"
              className={`input rounded-none max-w-full ${
                !isSeasonInputValid ? "invalid:border-red-900" : ""
              } transition`}
              minLength={5}
              maxLength={15}
              required
              onChange={handleSeasonInputChange}
            />
             */}
            <label htmlFor="week-name-input" className="form-label"></label>
            <input
              id="week-name-input"
              placeholder="WEEK NAME"
              type="text"
              className={`input rounded-none max-w-full ${
                !isWeekInputValid ? "invalid:border-red-900" : ""
              } transition`}
              minLength={5}
              maxLength={30}
              required
              onChange={handleWeekInputChange}
            />

            <div className="flex gap-2 mt-2">
              <ButtonDatePicker
                label={
                  thursday == null || thursday === ""
                    ? "Thursday"
                    : dayjs(thursday).format("DD/MM/YYYY")
                }
                value={thursday ? dayjs(thursday) : null} // Ensure Day.js object is passed if date is not null
                onChange={handleThursdayChange}
                disablePast={true}
              />
              <ButtonDatePicker
                label={
                  saturday == null || saturday === ""
                    ? "Saturday"
                    : dayjs(saturday).format("DD/MM/YYYY")
                }
                value={saturday ? dayjs(saturday) : null} // Ensure Day.js object is passed if date is not null
                onChange={handleSaturdayChange}
                disablePast={true}
              />
              <ButtonDatePicker
                label={
                  sunday == null || sunday === ""
                    ? "Sunday"
                    : dayjs(sunday).format("DD/MM/YYYY")
                }
                value={sunday ? dayjs(sunday) : null} // Ensure Day.js object is passed if date is not null
                onChange={handleSundayChange}
                disablePast={true}
              />
            </div>
            <label htmlFor="week-map-select" className="form-label"></label>
            <select
              onChange={handleMapInputChange}
              className="select select-solid rounded-none select-ghost-primary"
              name="week-map-select"
              id="week-map-select"
              required
            >
              <option value="" disabled selected>
                Select Map
              </option>
              {maps.map((map, index) => (
                <option key={index} value={map}>
                  {map}
                </option>
              ))}
            </select>
            <span className="italic text-gray-500 text-sm font-light mt-2 translate-y-2">
              Create a new Valoplant strategy{" "}
              <a
                className="link text-red-8 text-sm"
                href="https://valoplant.gg/"
                target="_blank"
                rel="noreferrer"

              >
                here
              </a>
            </span>
            <label htmlFor="week-valoplant" className="form-label"></label>
            <input
              id="week-valoplant"
              placeholder="Valoplant URL"
              type="text"
              className={`input rounded-none max-w-full ${
                !isValoplantInputValid ? "invalid:border-red-900" : ""
              } transition`}
              required
              minLength={12}
              maxLength={35}
              onChange={handleValoplantInputChange}
            />
            
          </div>
        </div>

        {/* <div className="form-group">
          <div className="form-field">
            <label htmlFor="team-tag-input" className="form-label"></label>
            <input
              id="team-tag-input"
              placeholder="#TEAM TAG"
              type="text"
              className={`input rounded-none max-w-full ${
                !isTagInputValid ? "invalid:border-red-900" : ""
              } transition`}
              minLength={1}
              maxLength={5}
              onChange={handleTagInputChange}
            />
            {!isTagInputValid && (
              <p className="text-red-8 text-sm absolute top-[220px]">
                1-5 CHARACTER LIMIT
              </p>
            )}
          </div>
        </div> */}
      </div>
      <div className="flex gap-3 mt-8">
        <button type="submit" className="btn btn-primary btn-block bg-red-7">
          CONFIRM
        </button>

        <label htmlFor="modal-create-team" className="btn btn-block">
          CANCEL
        </label>
      </div>
    </form>
  );
};

export default CreateWeekForm;
