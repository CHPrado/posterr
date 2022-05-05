import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { Posts } from "./components";
import { posterrContext } from "./contexts";
import { Home, User } from "./pages";

const Router = () => {
  const { contextUser } = useContext(posterrContext);

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Posts />} />
        {contextUser.followingIds && (
          <Route
            path="/following"
            element={<Posts userIds={contextUser.followingIds} />}
          />
        )}
        <Route path="/user/:id" element={<User />} />
      </Route>
      <Route path="*" element={<h1>Invalid route</h1>} />
    </Routes>
  );
};

export default Router;
