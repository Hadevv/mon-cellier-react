import React, { useEffect, useState } from "react";
import useLikeStore from "@/store/likeStore";
import useAuthStore from "@/store/authStore";
import WineImageCarousel from "./WineImageCarousel";
import WineComment from "./WineComment";
import WineNote from "./WineNote";
import WineDescription from "./WineDescription";
import { Button, buttonVariants } from "@/components/ui/button";
import WineCountry from "./WineCountry";
import { getLikesCount } from "@/services/api/likeService";

const CAVISTE_IMG_URL = "https://cruth.phpnet.org/epfc/caviste/public/pics/";

const WineDetail = ({ wine }) => {
  const [selectedTab, setSelectedTab] = useState("description");
  const likesStore = useLikeStore();

  useEffect(() => {
    document.title = `Détails du vin ${wine.name}`;
    getLikesCountAndUpdateStore(wine.id);
  }, [wine]);

  const getLikesCountAndUpdateStore = async (wineId) => {
    try {
      const count = await getLikesCount(wineId);
      likesStore.setLikesCount(count);
    } catch (error) {
      console.error("Échec de récupération du nombre de like", error);
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-[60%] flex justify-around">
        <div className="flex flex-col">
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
      <div className="h-[40%] flex flex-col justify-center items-center">
        <WineImageCarousel wineId={wine.id} />
      </div>
      <div className="h-[40%] flex justify-center">
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
    </div>
  );
};

export default WineDetail;

