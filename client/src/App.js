import React from "react";
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home";
import { AppProvider } from "./context/AppContext";
import Room from "./pages/Room";


function App() {

  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
