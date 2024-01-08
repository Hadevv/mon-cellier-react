import React, { useState } from "react";

export default function WineDescription({ wineDescription }) {
  console.log(wineDescription);
  const maxLength = 200;
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="p-4 bg-gray-100 border rounded">
      <h2 className="text-xl font-bold mb-4">Description</h2>
      <p>
        {showFullDescription
          ? wineDescription
          : wineDescription.slice(0, maxLength) + "..."}
        {!showFullDescription && (
          <button className="text-blue-500" onClick={toggleDescription}>
            Lire la suite
          </button>
        )}
      </p>

      {showFullDescription && (
        <button className="text-blue-500" onClick={toggleDescription}>
          Réduire
        </button>
      )}
    </div>
  );
}
