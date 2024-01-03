import React from "react";

import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchForm() {



  return (
    <div className="p-2 md:p-6 border-[2px] rounded-xl">
      <form onSubmit={(e) => e.preventDefault()}>
        <p className="text-[20px] font-bold">caviste</p>
        {/* input */}
        <Input
          type="text"
          placeholder="Search..."
          className=" w-full mt-5 rounded-lg"
        />
        {/* Select */}
        <SearchBar />

        <Button className="bg-primary w-full mt-5 color-primary rounded-lg">
          Search
        </Button>
      </form>
    </div>
  );
}
