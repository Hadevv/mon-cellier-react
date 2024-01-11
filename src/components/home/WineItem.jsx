import React, { useState } from "react";
// components
import { Card } from "@/components/ui/card";

export default function WineItem({ wine, onLike, onClick }) {
  const [isLiked, setIsLiked] = useState(false);

  // handleLikeClick gère le clic sur le bouton de like
  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    onLike(wine.id, !isLiked);
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
