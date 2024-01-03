import React, { useEffect, useState } from "react";
import SearchForm from "./SearchForm";
import WineItem from "./WineItem";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

export default function WineApp() {
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
    const filteredWines = listWines.filter((wine) =>
      wine.name.includes(keyword),
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
    <>
      {loadingError && <p>{loadingError}</p>}
      <SearchForm
        keyword={keyword}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <ul>
        {wines.map((wine) => (
          <WineItem key={wine.id} wine={wine} onLike={handleLike} />
        ))}
      </ul>
    </>
  );
}
