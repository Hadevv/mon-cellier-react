const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

// Fonction pour récupérer les vins
export const getWines = async () => {
  try {
    const response = await fetch(API_URL + "api/wines");
    if (!response.ok) {
      throw new Error("Invalid endpoint !");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fonction pour mettre à jour le like d'un vin
export const handleLike = async (wineId, isLiked) => {
  const options = {
    method: "PUT",
    body: JSON.stringify({ like: isLiked }),
    mode: "cors",
    headers: {
      "content-type": "application/json; charset=utf-8",
      Authorization: "Basic " + btoa("ced:123"),
    },
  };

  const fetchURL = `api/wines/${wineId}/like`;

  try {
    const response = await fetch(API_URL + fetchURL, options);
    if (!response.ok) {
      throw new Error("Failed to update like status");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
