import React, { useEffect } from "react";

const CAVISTE_IMG_URL = "https://cruth.phpnet.org/epfc/caviste/public/pics/";

export const WineDetails = ({ wine, likesCount}) => {
    useEffect(() => {
        document.title = `Détails du vin ${wine.name}`;
    }, [wine]);

  return (
    <div className="flex justify-around">
      <div className="">
        <h2 className="text-[22px] font-bold">Détails du Vin</h2>
        <p>Nom: {wine.name}</p>
        <p>Pays: {wine.country}</p>
        <p>Année: {wine.year}</p>
        <p>Cépage: {wine.grapes}</p>
        <p>Couleur: {wine.color}</p>
      </div>
      {wine.picture && (
        <img
          src={`${CAVISTE_IMG_URL}${wine.picture}`}
          alt={`Photo du vin ${wine.name}`}
          style={{ maxWidth: "100%", maxHeight: "300px" }}
          className="mix-blend-multiply"
        />
      )}
    </div>
  );
};
