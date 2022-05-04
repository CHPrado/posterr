import React, { useContext } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import { posterrContext } from "../../contexts";

import "./header.scss";

const Header = () => {
  const { contextUser } = useContext(posterrContext);

  return (
    <div className="header-wrapper">
      <div className="header-container">
        <span className="poster-title">Posterr</span>

        <div className="header-buttons-container">
          <Link to={`/`}>
            <FaHome size={24} />
            <span>Home</span>
          </Link>
          <Link to={`/user/${contextUser.id}`}>
            <FaUser size={24} />
            <span>Profile</span>
          </Link>
        </div>

        <div className="header-user-container">
          <img src={contextUser.avatar} alt={"logged-user-avatar"} />
          <span>{contextUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
