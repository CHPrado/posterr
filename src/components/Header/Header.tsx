import React, { FC } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

import { UserProps } from "../../interfaces";

import "./header.scss";

interface HeaderParams {
  loggedUser?: UserProps;
}

const Header: FC<HeaderParams> = ({ loggedUser }) => {
  return (
    <div className="header-container">
      <span className="poster-title">Posterr</span>

      <div className="header-buttons-container">
        <Link to={`/`}>
          <FaHome size={24} />
          <span>Home</span>
        </Link>
        <Link to={`/user/${loggedUser?.id}`}>
          <FaUser size={24} />
          <span>Profile</span>
        </Link>
      </div>

      <div className="header-user-container">
        <img src={loggedUser?.avatar} alt={"logged-user-avatar"} />
        <span>{loggedUser?.name}</span>
      </div>
    </div>
  );
};

export default Header;
