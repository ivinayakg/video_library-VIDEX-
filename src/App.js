import { useEffect, StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { useTheme } from "./context/themeContext";
import Main from "./pages";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.querySelector("body").className = theme;
  }, [theme]);

  return (
    <div className="App">
      <BrowserRouter>
        <StrictMode>
          <Main />
        </StrictMode>
      </BrowserRouter>
    </div>
  );
}

export default App;
