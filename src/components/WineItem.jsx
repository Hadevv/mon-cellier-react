import React, { useState } from "react";

import { Card } from "@/components/ui/card";

export default function WineItem({ wine, onLike }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    onLike(wine.id, !isLiked);
  };

  return (
    <li>
      <Card
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
