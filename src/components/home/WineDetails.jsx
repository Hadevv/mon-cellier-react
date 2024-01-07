import React, { useEffect } from "react";
import useLikeStore from "@/store/likeStore";
import { getLikesCount } from "@/services/api/apiService";
import { WineComment } from "./WineComment";
import { WineNote } from "./WineNote";

const CAVISTE_IMG_URL = "https://cruth.phpnet.org/epfc/caviste/public/pics/";

export default function WineDetails({ wine }) {
  const likesStore = useLikeStore();

  useEffect(() => {
    document.title = `Détails du vin ${wine.name}`;

    // Récupérer le nombre de likes du vin et mettre à jour le store
    getLikesCount(wine.id)
      .then((count) => likesStore.setLikesCount(count))
      .catch((error) => console.error("Failed to get likes count", error));
  }, [wine]);

  return (
    <div className="flex justify-around">
      <div className="flex justify-around">
        <div className="">
          <h2 className="text-[22px] font-bold">Détails du Vin</h2>
          <p>Nom: {wine.name}</p>
          <p>Pays: {wine.country}</p>
          <p>Année: {wine.year}</p>
          <p>Cépage: {wine.grapes}</p>
          <p>Couleur: {wine.color}</p>
          <p>Likes: {likesStore.likesCount}</p>
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
      <div>
        <div>
          <h2
            className="text-[22px] font-bold">
            Commentaires
          </h2>
          <WineComment wineId={wine.id} />
        </div>
        <div>
          <h2 className="text-[22px] font-bold">Notes</h2>
          <WineNote wineId={wine.id} />
        </div>
      </div>
    </div>
  );
}
