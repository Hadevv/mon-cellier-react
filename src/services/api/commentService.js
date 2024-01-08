import {
  getAuthorizationHeader,
  handleApiResponse,
} from "@/utils/apiServiceUtils";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

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
      throw new Error("Failed to add comment for wine " + wineId);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

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
      throw new Error(`Failed to edit comment ${commentId} for wine ${wineId}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

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
        `Failed to delete comment ${commentId} for wine ${wineId}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
