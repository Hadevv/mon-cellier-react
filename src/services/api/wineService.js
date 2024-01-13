const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

// getWines récupère les vins de l'API
export const getWines = async () => {
  try {
    const response = await fetch(API_URL + "api/wines");

    if (!response.ok) {
      throw new Error("Point de terminaison non valide");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
