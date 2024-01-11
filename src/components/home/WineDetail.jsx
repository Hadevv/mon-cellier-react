import React, { useEffect, useState } from "react";
// store Zustand
import useLikeStore from "@/store/likeStore";
import useAuthStore from "@/store/authStore";
// components
import WineImageCarousel from "./WineImageCarousel";
import WineComment from "./WineComment";
import WineNote from "./WineNote";
import WineDescription from "./WineDescription";
// services
import { getLikesCount } from "@/services/api/likeService";

const CAVISTE_IMG_URL = "https://cruth.phpnet.org/epfc/caviste/public/pics/";

export default function WineDetail({ wine }) {
  const [selectedTab, setSelectedTab] = useState("description");

  const likesStore = useLikeStore();
  const credentials = useAuthStore((state) => state.credentials);

  useEffect(() => {
    document.title = `Détails du vin ${wine.name}`;

    // getLikesCount récupére le nombre de likes d'un vin et le stocke dans le store
    getLikesCount(wine.id)
      .then((count) => likesStore.setLikesCount(count))
      .catch((error) => console.error("Failed to get likes count", error));
  }, [wine]);

  // handleTabClick gére le changement d'onglet (description, commentaires, notes)
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col justify-around">
      <div className="flex justify-around mb-5">
        <div className="">
          <h2 className="text-[22px] font-bold">Détails du Vin</h2>
          <p>Nom: {wine.name}</p>
          <p>Pays: {wine.country}</p>
          <p>Année: {wine.year}</p>
          <p>Cépage: {wine.grapes}</p>
          <p>Couleur: {wine.color}</p>
          <p>Likes: {likesStore.likesCount}</p>
          <p>ID: {wine.id}</p>
        </div>
        {wine.picture && (
          <img
            src={`${CAVISTE_IMG_URL}${wine.picture}`}
            alt={`Photo du vin ${wine.name}`}
            style={{ maxWidth: "100%", maxHeight: "250px" }}
            className="mix-blend-multiply"
          />
        )}
      </div>
      <div className="p-8 bg-white border rounded shadow-md">
        <div className="flex mb-4">
          <button
            className={`mr-4 px-4 py-2 rounded ${
              selectedTab === "description"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleTabClick("description")}
          >
            Description
          </button>
          <button
            className={`mr-4 px-4 py-2 rounded ${
              selectedTab === "comments"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => handleTabClick("comments")}
          >
            Commentaires
          </button>
          <button
            className={`mr-4 px-4 py-2 rounded ${
              selectedTab === "notes" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => handleTabClick("notes")}
          >
            Notes Personnelles
          </button>
        </div>
        <div>
          {selectedTab === "description" && (
            <WineDescription wineDescription={wine.description} />
          )}
          {selectedTab === "comments" && <WineComment wineId={wine.id} />}
          {selectedTab === "notes" && <WineNote wineId={wine.id} />}
        </div>
      </div>
      <div
        className="
        flex flex-col
        justify-center items-center
        bg-white border rounded shadow-md
        p-8 mt-8
        h-40
      "
      >
        <WineImageCarousel wineId={wine.id} credentials={credentials} />
      </div>
    </div>
  );
}
