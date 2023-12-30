import React, { useEffect } from "react";
import { useState } from "react";
import WineCard from "./WineCard";

const CAVISTE_API_URL =
  "http://cruth.phpnet.org/epfc/caviste/public/index.php/api";

export default function WineList() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetch(`${CAVISTE_API_URL}/wines`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []); // dependance vide

  return (
    <div className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-4
    mt-4
    ">
      {data.map((wine) => (
        <WineCard key={wine.id} wine={wine} />
      ))}
    </div>
  );
}
