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
      <Card className="">
        <CardHeader>
          <CardTitle>{wine.name}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
