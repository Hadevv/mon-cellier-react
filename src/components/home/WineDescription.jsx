import React, { useState } from "react";

export default function WineDescription({ wineDescription }) {
  const maxLength = 200;
  const [showFullDescription, setShowFullDescription] = useState(false);

  // toggleDescription gére l'affichage de la description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="p-4 border rounded h-full">
      <h2 className="text-xl font-bold mb-4">Description</h2>
      <p>
        {/* affiche les 200 premiers caractères de la description + "..." */}
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
