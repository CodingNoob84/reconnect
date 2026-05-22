import { useState } from "react";
import Cropper from "react-easy-crop";
import imageCompression from "browser-image-compression";
import { Upload } from "lucide-react";

import { uploadAvatar } from "#/services/upload.api";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  field: any;
  userId: string;
};

export function ProfileImageUpload({ field, userId }: Props) {
  const [open, setOpen] = useState(false);

  const [imageSrc, setImageSrc] = useState("");

  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImageSrc(imageUrl);

    setOpen(true);
  };

  const onCropComplete = (_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const getCroppedImg = async () => {
    const image = new Image();

    image.src = imageSrc;

    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    canvas.width = 400;
    canvas.height = 400;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      400,
      400,
    );

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/webp", 0.9);
    });
  };

  const handleSave = async () => {
    try {
      const croppedBlob = await getCroppedImg();

      if (!croppedBlob) return;

      const croppedFile = new File([croppedBlob], "avatar.webp", {
        type: "image/webp",
      });

      const compressedFile = await imageCompression(croppedFile, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 600,
        useWebWorker: true,
        fileType: "image/webp",
      });

      const arrayBuffer = await compressedFile.arrayBuffer();

      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          "",
        ),
      );

      const res = await uploadAvatar({
        data: {
          file: base64,
          userId,
        },
      });

      field.handleChange(`${res.url}?t=${Date.now()}`);

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card className="md:col-span-4 border-border/60 shadow-xs flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-base font-serif">
            Portrait Control
          </CardTitle>

          <CardDescription className="text-[11px]">
            Manage public visual image rendering
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 flex flex-col items-center text-center pt-2">
          <div className="relative group">
            <img
              src={field.state.value || "https://via.placeholder.com/400"}
              alt="Avatar preview"
              className="w-36 h-36 rounded-2xl object-cover border-4 border-background shadow-md"
            />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              onChange={handleFileSelect}
            />

            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="absolute -bottom-2 -right-2 rounded-xl h-8 w-8 shadow-xs border border-border"
              onClick={() => {
                document.getElementById("avatar-upload")?.click();
              }}
            >
              <Upload className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Crop Profile Image</DialogTitle>
          </DialogHeader>

          <div className="relative h-100 w-full rounded-xl overflow-hidden bg-black">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="rect"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
