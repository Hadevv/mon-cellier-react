import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import env from "react-dotenv";

console.log(env);

const URL = env.API_URL;
console.log(URL);

export default function WineList() {
  useEffect(() => {
    fetchWines();
  }, []);

  const fetchWines = async () => {
 
    const data = await fetch(URL);
    const wines = await data.json();
    console.log(wines);

    // const wineList = wines.map((wine) => {
    //   return (
    //     <div key={wine.id}>
    //       <h1>{wine.name}</h1>
    //       <p>{wine.year}</p>
    //       <p>{wine.country}</p>
    //       <p>{wine.type}</p>
    //     </div>
    //   );

  };
  return (
    
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Wine 1</TableCell>
            <TableCell>2019</TableCell>
            <TableCell>France</TableCell>
            <TableCell>{}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 2</TableCell>
            <TableCell>2018</TableCell>
            <TableCell>Spain</TableCell>
            <TableCell>White</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Wine 3</TableCell>
            <TableCell>2017</TableCell>
            <TableCell>Italy</TableCell>
            <TableCell>Red</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
