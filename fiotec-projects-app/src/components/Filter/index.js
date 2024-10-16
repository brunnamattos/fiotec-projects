import React, { useState } from "react";
import { categories } from "../../utils/categories";
import { useProjetos } from "../../context/ProjetosContext";

export const Filter = () => {
  const { handleFilterChange } = useProjetos();
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    handleFilterChange(category);
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
