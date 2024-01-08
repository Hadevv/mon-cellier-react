import {
  getAuthorizationHeader,
  handleApiResponse,
} from "@/utils/apiServiceUtils";

// Store Zustand authStore.js
import useAuthStore from "@/store/authStore";
import useLikeStore from "@/store/likeStore";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

export const handleLike = async (wineId, isLiked) => {
  const credentials = useAuthStore((state) => state.credentials);

  const options = {
    method: "PUT",
    body: JSON.stringify({ like: isLiked }),
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthorizationHeader(credentials),
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

export const getLikesCount = async (wineId) => {
  try {
    const response = await fetch(API_URL + `api/wines/${wineId}/likes-count`);
    if (!response.ok) {
      throw new Error("Failed to get likes count");
    }

    const data = await response.json();

    if (data && data.total) {
      // Extraction du nombre du champ total et conversion en nombre
      const likesCount = parseInt(data.total, 10);

      // Met à jour le store avec le nombre de likes
      useLikeStore.getState().setLikesCount(likesCount);

      return likesCount;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
