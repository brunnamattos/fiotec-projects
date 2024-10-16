import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import { Favorites } from '../pages/Favorites';
import ProjectView from '../pages/ProjectView';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/projetos" element={<Dashboard />} />
      <Route path="/meus_favoritos" element={<Favorites />} />
      <Route path="/projeto/:id" element={<ProjectView />} />
    </Routes>
  );
};

export default AppRoutes;