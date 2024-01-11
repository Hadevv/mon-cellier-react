import React from "react";

export const FilterSelect = ({ onFilterChange, selectedFilters }) => {
  // handleFilterChange gère le changement de filtre
  const handleFilterChange = (key, value) => {
    onFilterChange(key, value);

    // selectedValue est la valeur sélectionnée ou une chaîne vide si "All" est sélectionné
    const selectedValue = value === "All" ? "" : value;
    onFilterChange(key, selectedValue);
  };

  const filterOptions = {
    country: [
      "All",
      "France",
      "Italy",
      "Spain",
      "Portugal",
      "Germany",
      "Austria",
      "USA",
      "Argentina",
      "Hungary",
    ],
    year: [
      "All",
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
    ],
  };

  return (
    <div className="flex flex-col gap-3 mt-3">
      <label className="text-sm font-semibold">Country:</label>
      <select
        value={selectedFilters.country}
        onChange={(e) => handleFilterChange("country", e.target.value)}
        className="w-full h-9 px-3 border rounded-md text-sm focus:outline-none focus:border-accent"
      >
        <option value="All">-- All --</option>
        {filterOptions.country.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <label className="text-sm font-semibold">Year:</label>
      <select
        value={selectedFilters.year}
        onChange={(e) => handleFilterChange("year", e.target.value)}
        className="w-full h-9 px-3 border rounded-md text-sm focus:outline-none focus:border-accent"
      >
        <option value="All">-- All --</option>
        {filterOptions.year.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};
