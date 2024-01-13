import { getAuthorizationHeader } from "@/utils/apiServiceUtils";

const API_URL =
  "https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines";
const UPLOADS_URL = "https://cruth.phpnet.org/epfc/caviste/public/uploads";

// getWinePictures récupérer les images d'un vin
export const getWinePictures = async (wineId, credentials) => {
  try {
    const response = await fetch(`${API_URL}/${wineId}/pictures`, {
      method: "GET",
      headers: {
        ...getAuthorizationHeader(credentials),
      },
    });

    if (!response.ok) {
      throw new Error(
        `Échec de la récupération des images pour le vin ${wineId}`,
      );
    }

    const data = await response.json();
    const limitedImages = data.slice(0, 3).map((picture) => ({
      ...picture,
      imageUrl: `${UPLOADS_URL}/${picture.url}`,
    }));

    return limitedImages;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des images pour le vin ${wineId}:`,
      error.message,
    );
    throw error;
  }
};

// addWinePicture ajoute une image à un vin
export const addWinePicture = async (wineId, file, credentials) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`${API_URL}/${wineId}/pictures`, {
      method: "POST",
      body: formData,
      headers: {
        ...getAuthorizationHeader(credentials),
      },
    });

    if (!response.ok) {
      throw new Error(`Échec de l'ajout de l'image pour le vin ${wineId}`);
    }

    const data = await response.json();
    // On ajoute l'URL de l'image au résultat
    return {
      ...data,
      imageUrl: `${API_URL}/${data.filename}`,
    };
  } catch (error) {
    console.error(
      `Erreur lors de l'ajout de l'image pour le vin ${wineId}:`,
      error.message,
    );
    throw error;
  }
};

// deleteWinePicture supprime une image d'un vin
export const deleteWinePicture = async (wineId, pictureId, credentials) => {
  try {
    const response = await fetch(`${API_URL}/${wineId}/pictures/${pictureId}`, {
      method: "DELETE",
      headers: {
        ...getAuthorizationHeader(credentials),
      },
    });

    if (!response.ok) {
      throw new Error(
        `Échec de la suppression de l'image ${pictureId} pour le vin ${wineId}`,
      );
    }

    const data = await response.json();
    return {
      ...data,
      imageUrl: `${API_URL}/${data.filename}`,
    };
  } catch (error) {
    console.error(
      `Erreur lors de la suppression de l'image ${pictureId} pour le vin ${wineId}:`,
      error.message,
    );
    throw error;
  }
};
