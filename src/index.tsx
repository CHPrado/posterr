import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./global.scss";
import { PosterrProvider } from "./providers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PosterrProvider>
      <App />
    </PosterrProvider>
  </React.StrictMode>
);
