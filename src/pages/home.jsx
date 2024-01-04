import React, { useState, useEffect } from "react";
import AuthLayout from "@/layouts/AuthLayout";
import SearchForm from "@/components/formulaire/SearchForm";
import WineItem from "@/components/WineItem";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

export default function Home() {
  const [wines, setWines] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    fetchWines();
  }, []);

  const fetchWines = () => {
    fetch(API_URL + "api/wines")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid endpoint !");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setWines(data);

        localStorage.setItem("wines", JSON.stringify(data));
      })
      .catch((error) => {
        setLoadingError(error.message);
        setWines([]);
      });
  };

    const handleFilterChange = (key, value) => {
    setSelectedFilters({ ...selectedFilters, [key]: value });
    setKeyword(""); // Réinitialisez le mot-clé
    };

  const handleSubmit = () => {
    // Filtrez les vins en fonction du mot-clé et/ou des filtres
    const listWines = JSON.parse(localStorage.getItem("wines"));
    let filteredWines = listWines;

    // Filtrer en fonction du mot-clé si spécifié
    if (keyword.trim() !== "") {
      filteredWines = filteredWines.filter((wine) =>
        wine.name.toLowerCase().includes(keyword.toLowerCase()),
      );
    }

    // Filtrer en fonction des filtres sélectionnés si spécifiés
    if (Object.keys(selectedFilters).length > 0) {
      filteredWines = filteredWines.filter((wine) =>
        Object.entries(selectedFilters).every(
          ([key, value]) => wine[key] === value,
        ),
      );
    }
    console.log("Keyword:", keyword);
    console.log("Selected Filters:", selectedFilters);
    setWines(filteredWines);
    console.log("Filtered Wines:", filteredWines);

    console.log("Filtered Wines:", filteredWines);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
    setSelectedFilters({}); // Réinitialisez les filtres
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

    fetch(API_URL + fetchURL, options).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      }
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
                <WineItem key={wine.id} wine={wine} onLike={handleLike} />
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="p-2 overflow-auto h-[250px] md:p-6 border-[2px] rounded-xl bg-primary-foreground">
            <h2 className="text-[22px] font-bold">Recommended</h2>
            {/* Content for the large column */}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
