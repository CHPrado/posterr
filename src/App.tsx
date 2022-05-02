import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import { posterrContext } from "./contexts";
import { useData } from "./hooks";
import Router from "./routes";

function App() {
  const { setUser, setPosts } = useContext(posterrContext);
  const { loggin, loadPosts } = useData();

  useEffect(() => {
    loggin(setUser);
    loadPosts(setPosts);
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
