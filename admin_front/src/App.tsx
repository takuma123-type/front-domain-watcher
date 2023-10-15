import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/pages/Index";
import OccupationsPage from "./components/pages/Occupations";
import IndustriesPage from "./components/pages/Industries";
import ThemePage from "./components/pages/Themes";
import EventPage from "./components/pages/Event";
import EventCreate from "./components/pages/EventCreate";
import IndustriesCreate from "./components/pages/IndustriesCreate";
import OccupationCreate from "./components/pages/OccupationsCreate";
import ThemesCreate from "./components/pages/ThemesCreate";
import UserDetails from "./components/pages/UserDetails";
import SignIn from "./components/pages/SignIn";
import AdminUsers from "./components/pages/AdminUsers";

function App(): JSX.Element {
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
      <Route path="/sign_in" element={<SignIn />} />
      <Route path="/admin_users" element={<AdminUsers />} />
      <Route path="/users/details/:id" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
