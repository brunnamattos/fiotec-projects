import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ProjetosProvider from "./context/ProjetosContext";
import Header from "./components/Header";
import AppRoutes from "./routes";

const App = () => {
  return (
    <Router>
      <ProjetosProvider>
        <Header />
        <AppRoutes />
      </ProjetosProvider>
    </Router>
  );
};

export default App;
