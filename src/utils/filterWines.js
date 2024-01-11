import unorm from "unorm";

// unorm permet de normaliser les caractères accentués
const normalizeKeyword = (keyword) => {
  const normalizedKeyword = unorm
    .nfd(keyword)
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  return normalizedKeyword;
};

// filterWines est une fonction qui filtrer les vins en fonction des filtres et du mot-clé
export const filterWines = (wines, filters, keyword) => {
  // On crée une copie du tableau wines
  let filteredWines = [...wines];

  // On filtre les vins en fontion du filtre country
  if (filters && filters.country) {
    filteredWines = filteredWines.filter(
      (wine) => wine.country === filters.country,
    );
  }

  // On filtre les vins en fontion du filtre year
  if (filters && filters.year) {
    filteredWines = filteredWines.filter((wine) => wine.year === filters.year);
  }

  // On filtre les vins en fontion de la recherche par mot-clé
  if (keyword && keyword.trim() !== "") {
    const normalizedKeyword = normalizeKeyword(keyword);
    filteredWines = filteredWines.filter((wine) =>
      normalizeKeyword(wine.name).includes(normalizedKeyword),
    );
  }

  // On retourne le tableau de vins filtrés
  return filteredWines;
};
