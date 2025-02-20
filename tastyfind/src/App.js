import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import RecipeSearch from "./components/RecipeSearch";
import Favorites from "../src/components/Favorites";
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDetails from "./components/RecipeDetails";
const App = () => {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<RecipeSearch />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
