// getAuthorizationHeader est une fonction qui permet de gérer les headers des requêtes

export const getAuthorizationHeader = (credentials) => {
  const isAuthenticated = credentials !== null;

  if (isAuthenticated) {
    return {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Basic ${credentials}`,
    };
  }
  console.log(credentials);

  return {};
};

// handleApiResponse est une fonction qui permet de gérer les réponses des requêtes

export const handleApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error("Request failed");
  }
  const data = await response.json();
  return data;
};
    