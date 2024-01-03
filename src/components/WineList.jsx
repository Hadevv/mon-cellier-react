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
  }, []);

  return (
    <div
      className="
    flex
    flex-col
    overflow-auto
    h-[80vh]
    [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
    gap-3
    "
    >
      {data.map((wine) => (
        <WineCard key={wine.id} wine={wine} />
      ))}
    </div>
  );
}
