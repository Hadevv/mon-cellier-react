import React from 'react';

export default function WineComment() {
  return (
    <div className="p-4 bg-gray-100 border rounded">
      <h2 className="text-xl font-bold mb-4">Commentaires</h2>
      {/* Liste des commentaires */}
      {/* Boutons CRUD pour les commentaires */}
    </div>
  );
};
//GET	/api/wines/10/comments	Retrouve les commentaires du vin 10

// POST	/api/wines/10/comments { "content" : "some content" } Authorization	Ajoute un commentaire pour le vin 10

// PUT	/api/wines/10/comments/3 { "content" : "some new content" } Authorization	Modifie le commentaire 3 du vin 10

//DELETE /api/wines/10/comments/3 Authorization	Supprime le commentaire 3 du vin 10