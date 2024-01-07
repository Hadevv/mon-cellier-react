import useAuthStore from "@/store/authStore";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

const getAuthorizationHeader = (credentials) => {
  const isAuthenticated = credentials !== null;

  if (isAuthenticated) {
    return {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Basic ${credentials}`,
    };
  }

  return {};
};

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
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
