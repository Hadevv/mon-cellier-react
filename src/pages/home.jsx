import { useState, useEffect } from "react";

import AuthLayout from "@/layouts/AuthLayout";
import { FilterSelect } from "@/components/formulaire/FilterSelect";
import WineList from "@/components/WineList";
import SearchForm from "@/components/formulaire/SearchForm";
import WineItem from "@/components/WineItem";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

export default function Home() {
  const [wines, setWines] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
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

        //Sauvegarde de la liste des vins
        localStorage.setItem("wines", JSON.stringify(data));
      })
      .catch((error) => {
        //console.log(error.message)
        setLoadingError(error.message);
        setWines([]);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleChange(e) {
    setKeyword(e.target.value);
  }

  function handleClick(e) {
    //Récupérer la liste copmplète des vins
    const listWines = JSON.parse(localStorage.getItem("wines"));

    //Filtrer la liste au moyen du keyword
    const filteredWines = listWines.filter((wine) => wine.name.includes(keyword),
    );
    //Mettre à jour la variable de rendu wines
    setWines(filteredWines);
  }

  function handleLike(e) {
    const wineId = e.target.value;
    const options = {
      method: "PUT",
      body: JSON.stringify({ like: true }), //Try with true or false
      mode: "cors",
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: "Basic " + btoa("ced:123"), //Try with other credentials (login:password)
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
      <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-5 ">
        {/* Petite colonne 1 à gauche */}
        <div className="md:col-span-1">
          {loadingError && <p>{loadingError}</p>}
          <SearchForm
            keyword={keyword}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Petite colonne 2 à gauche */}
        <div className="md:col-span-1">
          {/* Contenu de la deuxième petite colonne */}
          <div className="flex flex-col overflow-auto h-[80vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-3">
            <ul>
              {wines.map((wine) => (
                <WineItem key={wine.id} wine={wine} onLike={handleLike} />
              ))}
            </ul>
          </div>
        </div>

        {/* Grande colonne à droite */}
        <div className="md:col-span-2">
          <div className="p-2 overflow-auto h-[250px] md:p-6 border-[2px] rounded-xl">
            <h2 className="text-[22px] font-bold">Recommended</h2>
            {/* Contenu de la grande colonne */}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
