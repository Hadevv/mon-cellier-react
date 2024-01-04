import React from "react";
import { FilterSelect } from "@/components/formulaire/FilterSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchForm({
  keyword,
  onChange,
  onSubmit,
  onFilterChange,
  selectedFilters,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedFilters);
    console.log("SearchForm - Submitted with Filters:", selectedFilters);
  };

  return (
    <div className="p-2 md:p-6 border-[2px] rounded-xl bg-primary-foreground">
      <form onSubmit={handleSubmit}>
        <p className="text-[20px] font-bold">caviste</p>
        {/* input */}
        <Input
          type="search"
          name="keyword"
          value={keyword}
          onChange={(e) => onChange(e)}
          placeholder="Search..."
          className="w-full mt-5 rounded-lg"
        />
        {/* Filter */}
        <FilterSelect onFilterChange={onFilterChange} />
        {/* Button */}
        <Button
          className="bg-primary w-full mt-5 color-primary rounded-lg"
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
