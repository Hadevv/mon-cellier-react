import {
  getAuthorizationHeader,
  handleApiResponse,
} from "@/utils/apiServiceUtils";

const API_URL = "https://cruth.phpnet.org/epfc/caviste/public/index.php/";

// getUsers récupère les utilisateurs de l'API
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
      throw new Error("Échec de la récupération des données utilisateur");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// authenticateUser authentifie un utilisateur
export const authenticateUser = async (username, password) => {
  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(`${API_URL}api/users/authenticate`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${credentials}`,
      },
    });

    const data = await handleApiResponse(response);

    return data;
  } catch (error) {
    console.error("Échec de l'authentification", error);
    throw new Error("Échec de l'authentification");
  }
};

