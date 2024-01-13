export default function countryConverter(country) {
  const countryList = {
    France: "fr",
    Italy: "it",
    Spain: "es",
    Portugal: "pt",
    Germany: "de",
    Austria: "at",
    USA: "us",
    Argentina: "ar",
    Hungary: "hu",
  };
  // si le pays est dans la liste, on retourne son abréviation
  const abbreviation = countryList[country];

  return abbreviation || country;
}
