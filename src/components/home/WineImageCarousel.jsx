import React, { useEffect, useState } from "react";
import ModalUpload from "@/components/home/ModalUpload";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  getWinePictures,
  addWinePicture,
  deleteWinePicture,
} from "@/services/api/pictureService";

export default function WineImageCarousel({ wineId, credentials }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const fetchedImages = await getWinePictures(wineId, credentials);
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error loading images:", error.message);
    }
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteWinePicture(wineId, imageId, credentials);
      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== imageId),
      );
    } catch (error) {
      console.error(`Error deleting image ${imageId}:`, error.message);
    }
  };

  const handleUploadImage = async (file) => {
    try {
      await addWinePicture(wineId, file, credentials);
      loadImages(); // Recharge les images après l'ajout
    } catch (error) {
      console.error(`Error uploading image:`, error.message);
    }
  };

  console.log("images", images);

  images.map((image) => console.log(image.imageUrl));

  return (
    <div>
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-mx-1">
          {images.map((image) => (
            <CarouselItem
              key={image.id}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={image.imageUrl} alt={`Wine ${wineId}`} />
                    <button onClick={() => handleDeleteImage(image.id)}>
                      Supprimer
                    </button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
