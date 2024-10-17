import React from "react";
import { categories } from "../../utils/categories";
import { useProjetos } from "../../context/ProjetosContext";
import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./index.css";

export const Filter = () => {
  const { selectedCategory, setSelectedCategory, handleFilterChange } =
    useProjetos();
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handleFilterChange(category);
    navigate("/projetos");
  };

  return (
    <div className="filter-container">
      <h5>Filtrar por categoria</h5>
      <Nav className="filter-nav">
        {categories.map(({ id, name }) => (
          <span
            key={id}
            onClick={() => handleCategoryChange(name)}
            className={`filter-item ${
              selectedCategory === name ? "active" : ""
            }`}
          >
            {name}
          </span>
        ))}
      </Nav>
    </div>
  );
};
