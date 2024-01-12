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

  const abbreviation = countryList[country];

    return abbreviation || country;
}
