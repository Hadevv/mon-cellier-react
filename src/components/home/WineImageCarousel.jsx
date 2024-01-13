import React, { useEffect, useState, useCallback } from "react";
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
import useAuthStore from "@/store/authStore";

const WineImageCarousel = ({ wineId }) => {
  const credentials = useAuthStore((state) => state.credentials);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // loadImages récupére les images d'un vin
  // useCallback permet de mémoriser la fonction pour éviter de la recréer à chaque rendu le composant
  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedImages = await getWinePictures(wineId, credentials);
      setImages(fetchedImages);
    } catch (error) {
      console.error("Erreur lors du chargement des images :", error.message);
    } finally {
      setLoading(false);
    }
  }, [wineId, credentials]);

  useEffect(() => {
    if (credentials) {
      loadImages();
    }
  }, [credentials, loadImages]);

  const handleDeleteImage = async (imageId) => {
    try {
      await deleteWinePicture(wineId, imageId, credentials);
      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== imageId),
      );
    } catch (error) {
      console.error(
        `Erreur lors de la suppression de l'image ${imageId}:`,
        error.message,
      );
    }
  };

  const handleUploadImage = async (file) => {
    try {
      await addWinePicture(wineId, file, credentials);
      loadImages();
    } catch (error) {
      console.error(`Erreur lors du téléchargement de l'image:`, error.message);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <Carousel className="w-full max-w-sm">
          <CarouselContent className=" h-full -mx-1">
            {images.map((image) => (
              <CarouselItem
                key={image.id}
                className="pl-1 basis-1/2 md:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <img
                        src={image.imageUrl}
                        alt={`Wine ${wineId}`}
                        loading="lazy"
                      />
                      <button
                        className="
                          absolute
                          bottom-0
                          bg-white
                          text-red-500
                          hover:bg-red-500
                          hover:text-white
                          font-bold
                        "
                        onClick={() => handleDeleteImage(image.id)}
                      >
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
      )}
      <ModalUpload
        onUpload={handleUploadImage}
        className="w-full max-w-sm"
        buttonClassName="w-full"
      />
    </div>
  );
};

export default WineImageCarousel;
