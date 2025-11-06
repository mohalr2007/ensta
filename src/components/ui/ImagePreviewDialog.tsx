
"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";

interface ImagePreviewDialogProps {
  imageUrl: string | null;
  onOpenChange: (open: boolean) => void;
}

export function ImagePreviewDialog({ imageUrl, onOpenChange }: ImagePreviewDialogProps) {
  return (
    <Dialog open={!!imageUrl} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 border-0">
        {imageUrl && (
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={imageUrl}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}