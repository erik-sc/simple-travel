import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/theme";
import TripForm from "./pages/TripForm";

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tripform" element={<TripForm />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;