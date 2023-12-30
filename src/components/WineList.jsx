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
    <div className="flex flex-col space-y-4 w-60">
      {data.map((wine) => (
        <WineCard key={wine.id} wine={wine} />
      ))}
    </div>
  );
}
