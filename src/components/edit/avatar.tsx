
import imageCompression from "browser-image-compression";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { uploadAvatar } from "#/services/upload.api";

type Props = {
  field: any;
  userId: string;
};

export function ProfileImageUpload({
  field,
  userId,
}: Props) {

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 600,
        useWebWorker: true,
        fileType: "image/webp",
      });

      const arrayBuffer = await compressedFile.arrayBuffer();

      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      const res = await uploadAvatar({
        data: {
          file: base64,
          userId,
        },
      });
console.log("res",res)
      field.handleChange(`${res.url}?t=${Date.now()}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
            src={
              field.state.value ||
              "https://via.placeholder.com/400"
            }
            alt="Avatar preview"
            className="w-36 h-36 rounded-2xl object-cover border-4 border-background shadow-md group-hover:opacity-90 transition-opacity"
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="avatar-upload"
            onChange={handleUpload}
          />

          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute -bottom-2 -right-2 rounded-xl h-8 w-8 shadow-xs border border-border"
            onClick={() => {
              document
                .getElementById("avatar-upload")
                ?.click();
            }}
          >
            <Upload className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Dimensions
          </p>

          <p className="text-[11px] font-medium text-foreground/80">
            Square layout optimized (400x400px)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}