import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { Header } from "../../components";
import { UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

import "./home.scss";

const Home = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [loggedUser, setLoggedUser] = useState<UserProps>();

  useEffect(() => {
    fakeApi.getUser().then((user) => setLoggedUser(user));
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Header loggedUser={loggedUser} />

      <div className="home-content-wrapper">
        <div className="home-content-container">
          <nav>
            <Link
              to="/"
              className={isHome ? "home-nav-active" : "home-nav-inactive"}
            >
              <span>Posts</span>
            </Link>
            <Link
              to="/following"
              className={isHome ? "home-nav-inactive" : "home-nav-active"}
            >
              <span>Following</span>
            </Link>
          </nav>

          <Outlet context={{ loggedUser, isHome }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
