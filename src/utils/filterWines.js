import unorm from "unorm";

const normalizeKeyword = (keyword) => {
  const normalizedKeyword = unorm
    .nfd(keyword)
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return normalizedKeyword;
};

export const filterWines = (wines, filters, keyword) => {
  let filteredWines = [...wines];

  if (filters && filters.country) {
    filteredWines = filteredWines.filter((wine) => wine.country === filters.country);
  }

  if (filters && filters.year) {
    filteredWines = filteredWines.filter((wine) => wine.year === filters.year);
  }

  // Vérifier que keyword est défini avant d'appeler trim()
  if (keyword && keyword.trim() !== "") {
    const normalizedKeyword = normalizeKeyword(keyword);
    filteredWines = filteredWines.filter((wine) =>
      normalizeKeyword(wine.name).includes(normalizedKeyword)
    );
  }

  return filteredWines;
};


