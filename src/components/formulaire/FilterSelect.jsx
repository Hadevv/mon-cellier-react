import React from "react";

export const FilterSelect = ({ onFilterChange, selectedFilters }) => {
  const handleCountryChange = (e) => {
    onFilterChange("country", e.target.value);
  };

  const handleYearChange = (e) => {
    onFilterChange("year", e.target.value);
  };

  return (
    <div>
      <label>Country:</label>
      <input
        type="text"
        value={selectedFilters.country}
        onChange={handleCountryChange}
      />

      <label>Year:</label>
      <input
        type="text"
        value={selectedFilters.year}
        onChange={handleYearChange}
      />
    </div>
  );
};
