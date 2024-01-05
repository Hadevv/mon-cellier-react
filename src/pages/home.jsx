import React, { useState, useEffect } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import SearchForm from "@/components/formulaire/SearchForm";
import WineItem from "@/components/WineItem";
import { WineDetails } from "@/components/WineDetails";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

// test = "year": "2009","country": "France" | keyword = "Château" | keyword = "Château" + "year": "2009","country": "USA"

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
  
    const fetchWines = async () => {
      try {
        const response = await fetch(API_URL + "api/wines");
        if (!response.ok) {
          throw new Error("Invalid endpoint !");
        }
  
        const data = await response.json();
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
  
    const filterWines = (data) => {
      const { country, year } = selectedFilters;
  
      let filteredWines = [...data];
  
      if (country) {
        filteredWines = filteredWines.filter((wine) => wine.country === country);
      }
  
      if (year) {
        filteredWines = filteredWines.filter((wine) => wine.year === year);
      }
  
      if (keyword.trim() !== "") {
        filteredWines = filteredWines.filter((wine) =>
          wine.name.toLowerCase().includes(keyword.toLowerCase())
        );
      }
  
      return filteredWines;
    };
  
    const handleFilterChange = (key, value) => {
        setSelectedFilters((prev) => ({ ...prev, [key]: value }));
        fetchWines();
      };
  
    const handleSubmit = () => {
      const listWines = wines;
  
      let filteredWines = filterWines(listWines);
  
      setWines(filteredWines);
      console.log("Home - Submitted with Keyword:", keyword);
      console.log("Home - Submitted with Filters:", selectedFilters);
      console.log("Home - Filtered Wines:", filteredWines);
    };
  
    const handleChange = (e) => {
      setKeyword(e.target.value);
    };
  
    function handleLike(wineId, isLiked) {
      const options = {
        method: "PUT",
        body: JSON.stringify({ like: isLiked }),
        mode: "cors",
        headers: {
          "content-type": "application/json; charset=utf-8",
          Authorization: "Basic " + btoa("ced:123"),
        },
      };
  
      const fetchURL = "api/wines/" + wineId + "/like";
  
      fetch(API_URL + fetchURL, options)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Failed to update like status");
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
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
                onLike={handleLike}
                onClick={() => handleWineClick(wine)}
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="p-2 overflow-auto h-[250px] md:p-6 border-[2px] rounded-xl bg-primary-foreground">
            {selectedWine ? (
              <WineDetails wine={selectedWine} />
            ) : (
              <h2 className="text-[22px] font-bold">Sélectionnez un Vin</h2>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
