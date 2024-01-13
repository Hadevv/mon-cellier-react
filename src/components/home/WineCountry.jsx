import React from "react";
import { CircleFlag } from "react-circle-flags";
import countryConverter from "@/utils/countryConverter";

export default function WineCountry({ wine }) {
  // countryConverter convertit le nom du pays en code pays
  const countryCode = countryConverter(wine.country);

  console.log(`country: ${wine.country}`);
  console.log(`country code: ${countryCode}`);

  return (
    <div className="flex items-center">
      <p className="mr-3">Pays: {wine.country}</p>
      <CircleFlag countryCode={countryCode} height="30" width="30" />
    </div>
  );
}


