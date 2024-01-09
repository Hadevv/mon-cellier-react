import { getAuthorizationHeader } from '@/utils/apiServiceUtils';

const API_URL = 'https://cruth.phpnet.org/epfc/caviste/public/index.php/api/wines';
const UPLOADS_URL = 'https://cruth.phpnet.org/epfc/caviste/public/uploads';

export const getWinePictures = async (wineId, credentials) => {
  try {
    const response = await fetch(`${API_URL}/${wineId}/pictures`, {
      method: 'GET',
      headers: {
        ...getAuthorizationHeader(credentials),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pictures for wine ${wineId}`);
    }

    const data = await response.json();
    const limitedImages = data.slice(0, 3).map((picture) => ({
      ...picture,
      imageUrl: `${UPLOADS_URL}/${picture.url}`,
    }));

    return limitedImages;
  } catch (error) {
    console.error(`Error fetching pictures for wine ${wineId}:`, error.message);
    throw error;
  }
};

export const addWinePicture = async (wineId, file, credentials) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/${wineId}/pictures`, {
      method: 'POST',
      body: formData,
      headers: {
        ...getAuthorizationHeader(credentials),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to add picture for wine ${wineId}`);
    }

    const data = await response.json();
    return {
      ...data,
      imageUrl: `${API_URL}/${data.filename}`,
    };
  } catch (error) {
    console.error(`Error adding picture for wine ${wineId}:`, error.message);
    throw error;
  }
};

export const deleteWinePicture = async (wineId, pictureId, credentials) => {
  try {
    const response = await fetch(`${API_URL}/${wineId}/pictures/${pictureId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthorizationHeader(credentials),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete picture ${pictureId} for wine ${wineId}`);
    }

    const data = await response.json();
    return {
      ...data,
      imageUrl: `${API_URL}/${data.filename}`,
    };
  } catch (error) {
    console.error(`Error deleting picture ${pictureId} for wine ${wineId}:`, error.message);
    throw error;
  }
};
