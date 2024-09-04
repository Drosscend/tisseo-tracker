import type { LineType } from "@/types/tisseo.type";
import { BusFrontIcon, CableCarIcon, PlaneIcon, TrainFrontTunnelIcon, TramFrontIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TisseoIconProps {
  mode: LineType;
  color: string;
  className?: string;
}

export function TisseoIcon({ mode, color, className }: TisseoIconProps) {
  switch (mode) {
    case "navette":
      return <PlaneIcon className={cn("size-4", className)} stroke={color} />;
    case "bus":
    case "Linéo":
    case "transport à la demande":
      return <BusFrontIcon className={cn("size-4", className)} stroke={color} />;
    case "métro":
      return <TrainFrontTunnelIcon className={cn("size-4", className)} stroke={color} />;
    case "tramway":
      return <TramFrontIcon className={cn("size-4", className)} stroke={color} />;
    case "téléphérique":
      return <CableCarIcon className={cn("size-4", className)} stroke={color} />;
    default:
      return null;
  }
}
