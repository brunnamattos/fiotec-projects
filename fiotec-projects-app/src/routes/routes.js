import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import { Favorites } from "../pages/Favorites";
import ProjetoView from "../pages/ProjetoView";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/projetos" />} />
      <Route path="/projetos" element={<Dashboard />} />
      <Route path="/projetos/:id" element={<ProjetoView />} />
      <Route path="/favoritos" element={<Favorites />} />
    </Routes>
  );
};

export default AppRoutes;
