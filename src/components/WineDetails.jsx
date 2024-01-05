import React from "react";

export const WineDetails = ({ wine }) => {
  return (
    <>
      <h2 className="text-[22px] font-bold">Détails du Vin</h2>
      <p>Nom: {wine.name}</p>
      <p>Pays: {wine.country}</p>
      <p>Année: {wine.year}</p>
      <p>Cépage: {wine.grapes}</p>
      <p>Couleur: {wine.color}</p>
      {/* Ajoutez d'autres détails du vin selon vos besoins */}
    </>
  );
};
