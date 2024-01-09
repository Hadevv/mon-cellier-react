import React from "react";
import { ModalUpload } from '@/components/ModalUpload';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function WineImageCarousel({ wineId, credentials }){
  const [images, setImages] = useState([]);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    // Remplacez la fonction suivante par l'appel à votre API pour récupérer les images
    // const fetchedImages = await getWinePictures(wineId, credentials);
    // setImages(fetchedImages);
    const fetchedImages = [
      { id: 1, url: 'https://example.com/image1.jpg' },
      { id: 2, url: 'https://example.com/image2.jpg' },
      { id: 3, url: 'https://example.com/image3.jpg' },
    ];
    setImages(fetchedImages);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      // Remplacez la fonction suivante par l'appel à votre API pour supprimer une image
      // await deleteWinePicture(wineId, imageId, credentials);
      console.log(`Deleted image ${imageId}`);
      setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
    } catch (error) {
      console.error(`Error deleting image ${imageId}:`, error.message);
    }
  };

  const handleUploadImage = async (file) => {
    try {
      // Remplacez la fonction suivante par l'appel à votre API pour télécharger une nouvelle image
      // await addWinePicture(wineId, file, credentials);
      console.log(`Uploaded image:`, file);
      loadImages(); // Recharge les images après l'ajout
    } catch (error) {
      console.error(`Error uploading image:`, error.message);
    }
  };

  return (
    <div>
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {images.map((image) => (
            <CarouselItem key={image.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={image.url} alt={`Wine ${wineId}`} />
                    <button onClick={() => handleDeleteImage(image.id)}>Supprimer</button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <ModalUpload onUpload={handleUploadImage} />
    </div>
  );
};