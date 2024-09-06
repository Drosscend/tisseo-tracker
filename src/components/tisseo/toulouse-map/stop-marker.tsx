import { MapPinIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { LineDetails } from "@/lib/tisseo/get-line-details";
import { StopTooltipContent } from "./stop-tooltip-content";

interface StopMarkerProps {
  stop: LineDetails["stopPointsWithSchedules"][0];
  line: LineDetails["line"];
  zoom: number;
}

export function StopMarker({ stop, line, zoom }: StopMarkerProps) {
  const iconSize = Math.max(16, 24 - zoom);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-pointer rounded-full bg-white p-1 shadow-md">
            <MapPinIcon className={`text-primary w-[${iconSize}px] h-[${iconSize}px] -z-10 text-black`} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="z-[9999] rounded-lg border-none bg-white p-0 shadow-lg" sideOffset={5}>
          <StopTooltipContent stop={stop} line={line} />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
