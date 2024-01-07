import React from 'react'

export const WineComment = () => {
  return (
    <div>WineComment</div>
  )
}
//GET	/api/wines/10/comments	Retrouve les commentaires du vin 10

// POST	/api/wines/10/comments { "content" : "some content" } Authorization	Ajoute un commentaire pour le vin 10

// PUT	/api/wines/10/comments/3 { "content" : "some new content" } Authorization	Modifie le commentaire 3 du vin 10

//DELETE /api/wines/10/comments/3 Authorization	Supprime le commentaire 3 du vin 10