import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ZoomControlProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export function ZoomControl({ onZoomIn, onZoomOut }: ZoomControlProps) {
  return (
    <div className="absolute left-4 top-4 flex flex-col gap-2">
      <Button variant="secondary" size="icon" onClick={onZoomIn} className="size-8 rounded-full shadow-md">
        <Plus className="size-4" />
        <span className="sr-only">Zoom in</span>
      </Button>
      <Button variant="secondary" size="icon" onClick={onZoomOut} className="size-8 rounded-full shadow-md">
        <Minus className="size-4" />
        <span className="sr-only">Zoom out</span>
      </Button>
    </div>
  );
}
