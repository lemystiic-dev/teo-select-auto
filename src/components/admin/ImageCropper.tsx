import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { X, Check } from "lucide-react";

interface ImageCropperProps {
  imageSrc: string;
  onCancel: () => void;
  onCropDone: (croppedBlob: Blob) => void;
  aspect?: number;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

async function getCroppedImg(imageSrc: string, pixelCrop: CropArea): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imageSrc;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Nu s-a putut crea canvas-ul");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Eroare la generarea imaginii"));
      },
      "image/webp",
      0.9
    );
  });
}

export function ImageCropper({ imageSrc, onCancel, onCropDone, aspect = 4 / 3 }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback((_croppedArea: unknown, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function handleConfirm() {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropDone(blob);
    } catch (err) {
      console.error("Eroare crop:", err);
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-card border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Decupează imaginea
          </h3>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-1 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Închide"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Crop area */}
        <div className="relative h-[400px] bg-black">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            showGrid
          />
        </div>

        {/* Zoom slider */}
        <div className="border-t border-border px-6 py-4">
          <label className="text-xs uppercase tracking-widest text-muted-foreground">
            Zoom
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="mt-2 w-full accent-primary"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-border px-6 py-2.5 text-sm hover:border-primary hover:text-primary transition-colors"
          >
            Anulează
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={processing}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-[color:var(--color-primary-hover)] disabled:opacity-50 transition-colors"
          >
            <Check className="h-4 w-4" />
            {processing ? "Se procesează..." : "Salvează crop"}
          </button>
        </div>
      </div>
    </div>
  );
}