import React, { useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { userEmail, userName, logout } = useAuth();

  return (
    <>
      <header>
        <nav className="navbar">
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
                      Profile
                    </NavLink>
                    <NavLink
                      to="/invites"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base dropdown-item bg-border"
                          : "text-base dropdown-item"
                      }
                    >
                      Invites
                    </NavLink>
                    {/* <a tabindex="-1" className="text-sm dropdown-item">
                    Account settings
                  </a>
                  <a tabindex="-1" className="text-sm dropdown-item">
                    Subscriptions
                  </a> */}
                    <div className="dropdown-divider"></div>
                    <a
                      className="text-sm text-center transition duration-200 text- align dropdown-item hover:bg-red-500"
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
        </nav>
      </header>
    </>
  );
};

export default Header;
