import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { userEmail, userName, logout } = useAuth();
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    // Initial theme setup based on the system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");

    // Listener to detect when the user changes their system preference
    const mediaQueryListener = (e) => setTheme(e.matches ? "dark" : "light");

    mediaQuery.addListener(mediaQueryListener);

    return () => mediaQuery.removeListener(mediaQueryListener);
  }, []);

  useEffect(() => {
    if (theme !== null) {
      // Save the theme preference
      localStorage.setItem("theme", theme);

      // Update the data-theme attribute on the html element
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <nav className="mx-auto navbar max-w-[1920px] ">
          <div className="navbar-start">
            <div className="avatar avatar-ring avatar-md">
              <div className="dropdown-container">
                <div className="dropdown dropdown-hover">
                  <label
                    className="flex px-0 cursor-pointer btn btn-ghost hover:bg-inherit"
                    tabIndex="0"
                  >
                    <img
                      src="https://static-00.iconduck.com/assets.00/games-valorant-icon-512x512-kqz6q7jw.png"
                      alt="avatar"
                    />
                  </label>
                  <div className="dropdown-menu dropdown-menu-bottom-right">
                    <div className="flex gap-2 navbar-end mb-2 md:hidden">
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
                          d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                        />
                      </svg>
                      <input
                        checked={theme === "dark" ? true : false}
                        onClick={toggleTheme}
                        onChange={() => {}} // To satisfy React controlled component requirement
                        type="checkbox"
                        className="switch"
                      />
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
                          d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                        />
                      </svg>
                    </div>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base dropdown-item bg-border"
                          : "text-base dropdown-item"
                      }
                    >
                      Team
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base dropdown-item bg-border"
                          : "text-base dropdown-item"
                      }
                    >
                      Profile (WIP)
                    </NavLink>
                    <NavLink
                      to="/invites"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base dropdown-item bg-border"
                          : "text-base dropdown-item"
                      }
                    >
                      Invites (WIP)
                    </NavLink>
                    {/* <div className="dropdown-divider"></div> */}
                    <p className="text-content3">Planorant v0.9</p>

                    {/* <a tabindex="-1" className="text-sm dropdown-item">
                    Account settings
                  </a>
                  <a tabindex="-1" className="text-sm dropdown-item">
                    Subscriptions
                  </a> */}
                    <div className="dropdown-divider"></div>
                    <a
                      className="text-sm text-center transition duration-200 text- align dropdown-item hover:bg-primary"
                      onClick={logout}
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <p className="navbar-item">{userName}</p>
          </div>
          {/* <div className="navbar-center">
            <NavLink to="/" className="navbar-item">
              Team
            </NavLink>
            <NavLink to="/profile" className="navbar-item">
              Profile
            </NavLink>
          </div> */}
          <div className="hidden md:navbar-center">
            <h2 className="text-primary italic">
              Planorant is a work in progress.
            </h2>
          </div>
          <div className="hidden md:flex gap-2 navbar-end">
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
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
            <input
              checked={theme === "dark" ? true : false}
              onClick={toggleTheme}
              onChange={() => {}} // To satisfy React controlled component requirement
              type="checkbox"
              className="switch"
            />
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
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;