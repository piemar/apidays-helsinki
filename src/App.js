import React from 'react';
import Home from "./pages/Home";
import './App.css';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#001e2b",
      paper: "#001e2b",
    },
  },
});


function App() {
  const atlasAppId="lotr-alugj";
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

    <div className="App">
      <Home atlasAppId={atlasAppId}/>
    </div>
    </ThemeProvider>
  );
}

export default App;
