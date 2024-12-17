import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./components/pages/home_page/Home.jsx";
import Create from "./components/pages/createPage/Create.jsx";
import Update from "./components/pages/updatePage/Update.jsx";
import Read from "./components/pages/readPage/Read.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/all" element={<Read/>}/>
        <Route path="/:id" element={<Update/>}/>
      </Routes>
    </Router>
  );
};

export default App;
