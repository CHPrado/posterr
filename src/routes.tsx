import React from "react";
import { Route, Routes } from "react-router-dom";

import { Posts } from "./components";
import { Home, User } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Posts />} />
        <Route path="/following" element={<Posts />} />
        <Route path="/user/:id" element={<User />} />
      </Route>
      <Route path="*" element={<h1>Invalid route</h1>} />
    </Routes>
  );
};

export default Router;
