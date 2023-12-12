import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function WineCard({ wine }) {
  return (
    <div>
      <Card
        className="bg-primary
        text-primary-foreground
        shadow
        hover:bg-primary/90"
      >
        <CardHeader>
          <CardTitle>{wine.name}</CardTitle>
          <CardDescription
            className="
        text-primary-foreground
        "
          >
            {wine.year}
          </CardDescription>
          <p>{wine.price} €</p>
        </CardHeader>
      </Card>
    </div>
  );
}
