import React, { useState, useEffect } from "react";
// layouts
import AuthLayout from "@/layouts/AuthLayout";
// components
import SearchForm from "@/components/formulaire/SearchForm";
import WineItem from "@/components/home/WineItem";
import WineDetail from "@/components/home/WineDetail";
// utils
import { filterWines } from "@/utils/filterWines";
// services
import { getWines } from "@/services/api/wineService";
import { handleLike } from "@/services/api/likeService";

export default function Home() {
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

  // fetchWines recupere les vins et les filtres
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

  // handleWineClick recupere le vin selectionné
  const handleWineClick = (wine) => {
    setSelectedWine(wine);
  };
  // handleFilterChange recupere les filtres selectionnés
  const handleFilterChange = (key, value) => {
    // select est un objet qui contient les filtres selectionnés
    setSelectedFilters((select) => ({ ...select, [key]: value }));
    fetchWines();
  };
  // handleSubmit recupere l'array des vins filtrés de utils/filterWines
  const handleSubmit = () => {
    const filteredWines = filterWines(wines, selectedFilters, keyword);
    setWines(filteredWines);
  };

  // handleChange recupere la valeur de l'input
  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  // handleLikeClick declenche le like du vin selectionné
  const handleLikeClick = async (wineId, isLiked) => {
    try {
      await handleLike(wineId, isLiked);
      fetchWines();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthLayout title={"Home"}>
      <div className="p-6 grid grid-cols-1 md:grid-cols-9 gap-5">
        <div className="md:col-span-2">
          {loadingError && <p>{loadingError}</p>}
          <SearchForm
            keyword={keyword}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
          />
        </div>

        <div className="md:col-span-3">
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

        <div className="md:col-span-4">
          <div className="h-[100%] p-2 overflow-auto md:p-6 border-[2px] rounded-xl bg-primary-foreground">
            {selectedWine ? (
              <WineDetail wine={selectedWine} />
            ) : (
              <h2 className="text-[22px] font-bold">Sélectionnez un Vin</h2>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
