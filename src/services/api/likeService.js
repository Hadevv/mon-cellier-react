import {
  getAuthorizationHeader,
  handleApiResponse,
} from "@/utils/apiServiceUtils";

// useAuthStore est un hook qui permet d'accéder au store de l'authentification
import useAuthStore from "@/store/authStore";
// useLikeStore est un hook qui permet d'accéder au store des likes
import useLikeStore from "@/store/likeStore";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

// handleLike gère le like d'un vin
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

// getLikesCount récupère le nombre de likes d'un vin
export const getLikesCount = async (wineId) => {
  try {
    const response = await fetch(API_URL + `api/wines/${wineId}/likes-count`);
    if (!response.ok) {
      throw new Error("Failed to get likes count");
    }

    const data = await response.json();

    // Si la réponse est valide, on met à jour le store
    if (data && data.total) {
      // On convertit le nombre de likes en nombre entier
      const likesCount = parseInt(data.total, 10);

      // On met à jour le store
      useLikeStore.getState().setLikesCount(likesCount);

      return likesCount;
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
