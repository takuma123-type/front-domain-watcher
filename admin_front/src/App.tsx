import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/pages/Index";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
    </Routes>
  );
}

export default App;
