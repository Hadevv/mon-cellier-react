import React, { useState } from "react";

export default function WineItem({ wine, onLike }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    onLike(wine.id, !isLiked); 
  };

  return (
    <li className="wine" key={wine.id}>
      {wine.name}{" "}
      <button value={wine.id} onClick={handleLikeClick}>
        {isLiked ? "❤️" : "🤍"}
      </button>
    </li>
  );
}


// ssName="flex flex-col overflow-auto h-[80vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-3">