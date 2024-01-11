import React, { useState } from "react";
//components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ModalUpload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // handleFileChange gére le changement de fichier
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // handleSubmit gére la soumission du formulaire
  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Your image</Label>
            <Input
              className="
              col-span-3
              bg-gray-100
              border-none
              focus:ring-0
              focus:border-gray-100
              rounded-md
              text-gray-400
              text-center
              cursor-pointer
              disabled:cursor-not-allowed"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
