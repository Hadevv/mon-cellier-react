import React, { useState, useEffect } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import SearchForm from "@/components/formulaire/SearchForm";
import WineItem from "@/components/home/WineItem";
import  WineDetails from "@/components/home/WineDetails";
import { filterWines } from "@/lib/filterWines";
import { getWines, handleLike } from "@/services/api/apiService";

export default function Home(){
  const [wines, setWines] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    year: "",
    country: "",
  });
  const [selectedWine, setSelectedWine] = useState(null);

  useEffect(() => {
    fetchWines();
  }, [selectedFilters]);

  const fetchWines = async () => {
    try {
      const data = await getWines();
      const filteredWines = filterWines(data);
      setWines(filteredWines);
    } catch (error) {
      setLoadingError(error.message);
      setWines([]);
    }
  };

  const handleWineClick = (wine) => {
    setSelectedWine(wine);
  };

  const handleFilterChange = (key, value) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
    fetchWines();
  };

  const handleSubmit = () => {
    const filteredWines = filterWines(wines, selectedFilters, keyword);
    setWines(filteredWines);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleLikeClick = async (wineId, isLiked) => {
    try {
      await handleLike(wineId, isLiked);
      // Mise à jour des vins après avoir géré le like
      fetchWines();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout title={"Home"}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="md:col-span-1">
          {loadingError && <p>{loadingError}</p>}
          <SearchForm
            keyword={keyword}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
          />
        </div>

        <div className="md:col-span-1">
          <div className="flex flex-col overflow-auto h-[80vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-3">
            <ul>
              {wines.map((wine) => (
                <WineItem
                  key={wine.id}
                  wine={wine}
                  onLike={() => handleLikeClick(wine.id, !wine.like)}
                  onClick={() => handleWineClick(wine)}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="h-[400px] p-2 overflow-auto md:p-6 border-[2px] rounded-xl bg-primary-foreground">
            {selectedWine ? (
              <WineDetails
              wine={selectedWine}
              />
            ) : (
              <h2 className="text-[22px] font-bold">Sélectionnez un Vin</h2>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};


