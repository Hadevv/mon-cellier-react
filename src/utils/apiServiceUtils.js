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

export const handleApiResponse = async (response) => {
  if (!response.ok) {
    throw new Error("Request failed");
  }

  const data = await response.json();
  return data;
};
    