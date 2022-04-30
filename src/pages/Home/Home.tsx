import React from "react";
import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/user/test">Link to profile</Link>
      <Outlet />
    </div>
  );
}

export default Home;
