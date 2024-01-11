import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import useLikeStore from "@/store/likeStore";

export default function WineItem({ wine, onClick }) {
  const [isLiked, setIsLiked] = useState(false);
  const { addLike, removeLike, userLikes, initLikesFromLocalStorage } = useLikeStore();

  useEffect(() => {
    // Initialiser les likes depuis le localStorage
    initLikesFromLocalStorage();
  }, []);

  useEffect(() => {
    // Vérifier si le vin est déjà aimé par l'utilisateur
    setIsLiked(userLikes.includes(wine.id));
  }, [userLikes, wine.id]);

  const handleLikeClick = () => {
    // Inverser l'état du like
    setIsLiked((prevIsLiked) => !prevIsLiked);

    // Ajouter ou supprimer le like dans le store en fonction de l'état précédent
    if (!isLiked) {
      addLike(wine.id);
    } else {
      removeLike(wine.id);
    }
  };

  return (
    <li>
      <Card
        onClick={onClick}
        className="wine flex justify-between items-center p-3 mb-2"
        key={wine.id}
      >
        {wine.name}
        <button value={wine.id} onClick={handleLikeClick}>
          {isLiked ? "❤️" : "🤍"}
        </button>
      </Card>
    </li>
  );
}

