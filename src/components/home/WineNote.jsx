import React from 'react';

export default function WineNote() {
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Notes Personnelles</h2>
      {/* Contenu des notes personnelles */}
      {/* Boutons CRUD pour les notes personnelles */}
    </div>
  );
};

// PUT	/api/wines/10/notes { "note" : "some new content" } Authorization	Ajoute ou modifie la note du vin 10 pour le user connecté

// GET	/api/wines/10/notesAuthorization