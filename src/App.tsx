import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddContact from "./Pages/AddContact";
import EditContact from "./Pages/EditContact";
import React from "react";

function App() {
  return (
    <>
        <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
