// src/routes/HomeRoutes.js
import OccupationCreate from "../components/pages/OccupationsCreate.js";
import IndustriesCreate from "../components/pages/IndustriesCreate.js";
import ThemesCreate from "../components/pages/ThemesCreate.js";
import EventCreate from "../components/pages/EventCreate.js";

export const homeRoutes = [
  {
    path: "new",
    children: <OccupationCreate />,
  },
  {
    path: "new",
    children: <IndustriesCreate />,
  },
  {
    path: "new",
    children: <ThemesCreate />,
  },
  {
    path: "new",
    children: <EventCreate />,
  },
];
