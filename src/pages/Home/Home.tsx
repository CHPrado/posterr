import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { UserProps } from "../../interfaces";
import { fakeApi } from "../../services";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState<UserProps>();

  useEffect(() => {
    fakeApi.getUser().then((user) => setLoggedUser(user));
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h2>
        Welcome to the Home Page
        <Link to={`/user/${loggedUser?.id}`}>{loggedUser?.name}</Link>
      </h2>
      <nav>
        <Link to="/">Posts</Link>
        <Link to="/following">Who you follow</Link>
      </nav>

      <Outlet context={loggedUser} />
    </div>
  );
};

export default Home;
