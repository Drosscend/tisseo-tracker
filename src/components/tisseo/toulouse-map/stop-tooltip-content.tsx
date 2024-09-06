import { AccessibilityIcon, ArrowRightIcon, InfoIcon, MapPinIcon } from "lucide-react";
import { TisseoIcon } from "@/components/tisseo/icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LineDetails } from "@/lib/tisseo/fetch-line-details";

interface StopTooltipContentProps {
  stop: LineDetails["stopPointsWithSchedules"][0];
  line: LineDetails["line"];
}

export function StopTooltipContent({ stop, line }: StopTooltipContentProps) {
  return (
    <Card className="w-64">
      <CardContent className="p-4">
        <div className="mb-2 flex items-center space-x-2">
          <MapPinIcon className="text-primary size-4" />
          <h3 className="text-lg font-bold">{stop.stopPoint.name}</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <AccessibilityIcon className="size-4" />
            <span>{stop.stopPoint.handicappedCompliance === "1" ? "Accessible" : "Non accessible"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowRightIcon className="size-4" />
            <span>Vers : {stop.stopPoint.destinations[0]?.name || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TisseoIcon mode={line.transportMode.name} color="black" className="size-4" />
            <Badge variant="secondary">Ligne {stop.stopPoint.lines[0].short_name}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <InfoIcon className="size-4" />
            <span>Réseau : {stop.stopPoint.operatorCodes[0]?.operatorCode.network || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
