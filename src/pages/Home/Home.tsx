import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { Header, PostForm } from "../../components";

import "./home.scss";

const Home = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div>
      <Header />

      <div className="home-content-wrapper">
        <div className="home-content-container">
          <PostForm />

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

          <Outlet context={{ isHome }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
