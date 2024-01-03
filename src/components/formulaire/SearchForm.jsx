import React from "react";

import { FilterSelect } from "@/components/formulaire/FilterSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchForm({ keyword, onChange, onSubmit, onClick }) {
  return (
    <div className="p-2 md:p-6 border-[2px] rounded-xl">
      <form onSubmit={(e) => onSubmit(e)}>
        <p className="text-[20px] font-bold">caviste</p>
        {/* input */}
        <Input
          type="text"
          name="keyword"
          value={keyword}
          onChange={(e) => onChange(e)}
          placeholder="Search..."
          className="w-full mt-5 rounded-lg"
        />
        {/* Filter */}
        <FilterSelect />
        {/* Button */}
        <Button
          className="bg-primary w-full mt-5 color-primary rounded-lg"
          type="submit"
          onClick={onClick}
        >
          Search
        </Button>
      </form>
    </div>
  );
}
