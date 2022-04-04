import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { ThemeContextProvider } from "./context/themeContext";
import { GlobalContextProvider } from "./context/GlobalContext";

// Call make Server
makeServer();

ReactDOM.render(
  <GlobalContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </GlobalContextProvider>,
  document.getElementById("root")
);
