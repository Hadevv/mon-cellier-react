import { getAuthorizationHeader } from "@/utils/apiServiceUtils";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

// updateWineNote met à jour la note d'un vin
export const updateWineNote = async (wineId, note, credentials) => {
  const options = {
    method: "PUT",
    body: JSON.stringify({ note }),
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthorizationHeader(credentials),
    },
  };

  const fetchURL = `api/wines/${wineId}/notes`;

  try {
    const response = await fetch(API_URL + fetchURL, options);
    if (!response.ok) {
      throw new Error(`Échec de l'ajout ou de la mise à jour de la note pour le vin ${wineId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// getWineNote récupère la note d'un vin
export const getWineNote = async (wineId, credentials) => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthorizationHeader(credentials),
    },
  };

  const fetchURL = `api/wines/${wineId}/notes`;

  try {
    const response = await fetch(API_URL + fetchURL, options);
    if (!response.ok) {
      throw new Error(`Échec de la récupération de la note pour le vin ${wineId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

