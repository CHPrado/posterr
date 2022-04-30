import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home, User } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/user/test" element={<User />} />
      </Route>
    </Routes>
  );
};

export default Router;
