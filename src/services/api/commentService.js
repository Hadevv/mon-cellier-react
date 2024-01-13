import {
  getAuthorizationHeader,
  handleApiResponse,
} from "@/utils/apiServiceUtils";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

// getWineComments récupère les commentaires d'un vin
export const getWineComments = async (wineId) => {
  try {
    const response = await fetch(API_URL + `api/wines/${wineId}/comments`);
    if (!response.ok) {
      throw new Error("Échec de la récupération des commentaires pour le vin " + wineId);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// addWineComment ajoute un commentaire à un vin
export const addWineComment = async (wineId, content, credentials) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ content }),
    mode: "cors",
    headers: {
      ...getAuthorizationHeader(credentials),
    },
  };

  console.log(options);

  const fetchURL = `api/wines/${wineId}/comments`;

  try {
    const response = await fetch(API_URL + fetchURL, options);
    if (!response.ok) {
      throw new Error("Échec de l'ajout du commentaire pour le vin " + wineId);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// editWineComment modifie un commentaire d'un vin
export const editWineComment = async (
  wineId,
  commentId,
  content,
  credentials,
) => {
  const options = {
    method: "PUT",
    body: JSON.stringify({ content }),
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthorizationHeader(credentials),
    },
  };

  const fetchURL = `api/wines/${wineId}/comments/${commentId}`;

  try {
    const response = await fetch(API_URL + fetchURL, options);
    if (!response.ok) {
      throw new Error(`Échec de la modification du commentaire ${commentId} pour le vin ${wineId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// deleteWineComment supprime un commentaire d'un vin
export const deleteWineComment = async (wineId, commentId, credentials) => {
  const options = {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthorizationHeader(credentials),
    },
  };

  const fetchURL = `api/wines/${wineId}/comments/${commentId}`;

  try {
    const response = await fetch(API_URL + fetchURL, options);
    if (!response.ok) {
      throw new Error(
        `Échec de la suppression du commentaire ${commentId} pour le vin ${wineId}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

