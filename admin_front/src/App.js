import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/pages/Index.js";
import OccupationsPage from "./components/pages/Occupations.js";
import IndustriesPage from "./components/pages/Industries.js";
import ThemePage from "./components/pages/Themes.js";
import EventPage from "./components/pages/Event.js";
import EventCreate from "./components/pages/EventCreate.js";
import IndustriesCreate from "./components/pages/IndustriesCreate.js";
import OccupationCreate from "./components/pages/OccupationsCreate.js";
import ThemesCreate from "./components/pages/ThemesCreate.js";
import UserDetails from "./components/pages/UserDetails.js";
import SignUp from "./components/pages/SignUp.js";
import AdminUsers from "./components/pages/AdminUsers.js";
import Company from "./components/pages/Companies.js";
import CompaniesDetails from "./components/pages/CompaniesDetails.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/occupations" element={<OccupationsPage />} />
      <Route path="/occupations/new" element={<OccupationCreate />} />
      <Route path="/industries" element={<IndustriesPage />} />
      <Route path="/industries/new" element={<IndustriesCreate />} />
      <Route path="/themes" element={<ThemePage />} />
      <Route path="/themes/new" element={<ThemesCreate />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/event/new" element={<EventCreate />} />
      <Route path="/users/details" element={<UserDetails />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/admin_users" element={<AdminUsers />} />
      <Route path="/companies" element={<Company />} />
      <Route path="/users/details/:id" element={<UserDetails />} />
      <Route path="/companies/details/:id" element={<CompaniesDetails />} />
    </Routes>
  );
}

export default App;
