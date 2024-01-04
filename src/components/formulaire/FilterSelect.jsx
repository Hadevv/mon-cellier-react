import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const filterOptions = {
  country: ["France", "Italy", "Spain", "Portugal", "Germany", "Austria", "USA", "Argentina", "Hungary"],
  year: [
    "1999", "2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
    "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020",
    "2021", "2022", "2023"
  ],
};

export function FilterSelect({ onFilterChange }) {
  const handleFilterChange = (key, value) => {
    onFilterChange(key, value);
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-3">
      {Object.keys(filterOptions).map((key) => (
        <Select key={key}>
          <SelectTrigger>
            <SelectValue placeholder={key} />
          </SelectTrigger>
          <SelectContent className="overflow-auto h-[200px]">
            <SelectGroup>
              {filterOptions[key].map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                  onClick={() => handleFilterChange(key, item)}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}


