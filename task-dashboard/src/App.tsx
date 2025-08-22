// src/App.jsx
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Workspace from "./components/Workspace";
import "./App.css";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return showDashboard ? (
    <div className="App"> {/* keep Dashboard boxed layout */}
      <Dashboard />
    </div>
  ) : (
    <Workspace onGoToDashboard={() => setShowDashboard(true)} /> 
    // no .App class → full screen white page
  );
}

export default App;
