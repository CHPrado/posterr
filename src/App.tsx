import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { posterrContext } from "./contexts";
import { useData } from "./hooks";
import Router from "./routes";

function App() {
  const { setContextUser, setContextUsers, setContextPosts } =
    useContext(posterrContext);
  const { loggin, loadPosts, loadUsers } = useData();

  useEffect(() => {
    loggin(setContextUser);
    loadUsers(setContextUsers);
    loadPosts(setContextPosts);
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
