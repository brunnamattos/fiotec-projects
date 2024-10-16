import React, { useState } from "react";
import { categories } from "../../utils/categories";
import { useProjetos } from "../../context/ProjetosContext";
import { useNavigate } from "react-router-dom";

export const Filter = () => {
  const { handleFilterChange } = useProjetos();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handleFilterChange(category);
    navigate("/");
  };

  return (
    <div className="filter-container">
      <h3>Filtros</h3>
      <div>
        {categories.map(({ id, name }) => (
          <div
            key={id}
            onClick={() => handleCategoryChange(name)}
            className={selectedCategory === name ? "selected" : ""}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};
