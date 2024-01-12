import React, { useEffect, useState } from "react";
// store Zustand
import useLikeStore from "@/store/likeStore";
import useAuthStore from "@/store/authStore";
// components
import WineImageCarousel from "./WineImageCarousel";
import WineComment from "./WineComment";
import WineNote from "./WineNote";
import WineDescription from "./WineDescription";
import { Button, buttonVariants } from "@/components/ui/button";
import WineCountry from "./WineCountry";

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
          <WineCountry wine={wine} />
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
            loading="lazy"
          />
        )}
      </div>
      <div className="flex mb-4">
        <Button
          className={`mr-4 px-4 py-2 rounded-md ${
            selectedTab === "description" ? "" : ""
          }`}
          onClick={() => handleTabClick("description")}
        >
          Description
        </Button>
        <Button
          className={`mr-4 px-4 py-2 rounded-md ${
            selectedTab === "comments" ? "" : ""
          }`}
          onClick={() => handleTabClick("comments")}
        >
          Commentaires
        </Button>
        <Button
          className={`mr-4 px-4 py-2 rounded-md ${
            selectedTab === "notes" ? "" : ""
          }`}
          onClick={() => handleTabClick("notes")}
        >
          Notes Personnelles
        </Button>
      </div>
      <div>
        {selectedTab === "description" && (
          <WineDescription wineDescription={wine.description} />
        )}
        {selectedTab === "comments" && <WineComment wineId={wine.id} />}
        {selectedTab === "notes" && <WineNote wineId={wine.id} />}
      </div>
      <div
        className="
        flex flex-col
        justify-center items-center
        primary-foreground border rounded shadow-md
        p-8 mt-8
        h-40"
      >
        <WineImageCarousel wineId={wine.id} />
      </div>
    </div>
  );
}
