import React from "react";
import { BrowserRouter } from "react-router-dom";

import { useData } from "./hooks";
import Router from "./routes";

function App() {
  const { loggin, loadPosts } = useData();
  loggin();
  loadPosts();

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
