import useAuthStore from "@/store/authStore";
import useLikeStore from "@/store/likeStore";

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

// Crud Wines

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

// Crud Comments

export const getWineComments = async (wineId) => {
  try {
    const response = await fetch(API_URL + `api/wines/${wineId}/comments`);
    if (!response.ok) {
      throw new Error("Failed to retrieve comments for wine " + wineId);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addWineComment = async (wineId, content) => {
  const credentials = useAuthStore((state) => state.credentials);

  const options = {
    method: "POST",
    body: JSON.stringify({ content }),
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...getAuthorizationHeader(credentials),
    },
  };

  const fetchURL = `api/wines/${wineId}/comments`;

  try {
    const response = await fetch(API_URL + fetchURL, options);
    if (!response.ok) {
      throw new Error("Failed to add comment for wine " + wineId);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const editWineComment = async (wineId, commentId, content) => {
  const credentials = useAuthStore((state) => state.credentials);

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
      throw new Error(`Failed to edit comment ${commentId} for wine ${wineId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteWineComment = async (wineId, commentId) => {
  const credentials = useAuthStore((state) => state.credentials);

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
        `Failed to delete comment ${commentId} for wine ${wineId}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Crud notes

export const updateWineNote = async (wineId, note) => {
  const credentials = useAuthStore((state) => state.credentials);

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
      throw new Error(`Failed to add or update note for wine ${wineId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getWineNote = async (wineId) => {
  const credentials = useAuthStore((state) => state.credentials);

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
      throw new Error(`Failed to get note for wine ${wineId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Crud Users

export const getUsers = async () => {
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const fetchURL = `api/users`;

  try {
    const response = await fetch(API_URL + fetchURL, options);
    if (!response.ok) {
      throw new Error("Failed to retrieve user data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Crud likes

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