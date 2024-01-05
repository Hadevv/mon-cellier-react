// GET	/api/wines/10	Retrouve le vin dont l'id == 10
// GET	/api/wines?key=country&val=France&sort=year	Filtre les vins de France triés par année
// GET	/api/wines/search?keyword=Chateau	Recherche les vins dont le nom contient ‘Chateau’
// GET	/api/wines/10/comments	Retrouve les commentaires du vin 10
// GET	/api/wines/countries	Retrouve les différents pays
// GET	/api/wines/10/likes-count	Retrouve le nombre de likes du vin 10
// GET	/api/users/5/likes/wines	Retrouve les vins préférés de l’utilisateur 5
// PUT	/api/wines/10/like
// { "like" : true|false }
// Authorization	Ajoute ou retire le vin 10 parmi ses préférés
// POST	/api/wines/10/comments
// { "content" : "some content" }
// Authorization	Ajoute un commentaire pour le vin 10
// PUT	/api/wines/10/comments/3
// { "content" : "some new content" }
// Authorization	Modifie le commentaire 3 du vin 10
// DELETE	/api/wines/10/comments/3
// Authorization	Supprime le commentaire 3 du vin 10
// POST	/api/wines/10/pictures
// FormData
// Authorization	Ajoute une image pour le vin 10
// DELETE	/api/wines/10/pictures/2
// Authorization	Supprime l’image 2 du vin 10
// GET	/api/wines/10/pictures
// Authorization	Récupère les images supplémentaires pour le vin 10 (de 0 à 3 images stockées dans le dossier uploads)
// GET	/api/users	Retrouve l'id et le login de tous les utilisateurs
// GET	/api/users/authenticate
// Authorization	Authentifie un utilisateur
// GET	/api/wines/10/notes
// Authorization	Récupère la note du vin 10 pour le user connecté
// PUT	/api/wines/10/notes
// { "note" : "some new content" }
// Authorization	Ajoute ou modifie la note du vin 10 pour le user connecté
