import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ProjetosProvider from "./context/ProjetosContext";
import Header from "./components/Header";
import AppRoutes from "./routes/routes";

const App = () => {
  return (
    <ProjetosProvider>
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    </ProjetosProvider>
  );
};

export default App;
