import { MapPinIcon } from "lucide-react";

interface StopMarkerProps {
  zoom: number;
  onMouseHover: () => void;
  onMouseLeave: () => void;
}

export function StopMarker({ zoom, onMouseHover, onMouseLeave }: StopMarkerProps) {
  const iconSize = Math.max(16, 24 - zoom);

  return (
    <div className="bg-primary-foreground cursor-pointer rounded-full p-1 shadow-md" onMouseEnter={onMouseHover} onMouseLeave={onMouseLeave}>
      <MapPinIcon className={`text-primary w-[${iconSize}px] h-[${iconSize}px] -z-10 text-black`} />
    </div>
  );
}
