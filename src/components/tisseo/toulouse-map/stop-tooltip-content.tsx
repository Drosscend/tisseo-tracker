import { formatDistanceToNowStrict, isSameMinute } from "date-fns";
import { fr } from "date-fns/locale";
import { AccessibilityIcon, ArrowRightIcon, ClockIcon, InfoIcon, MapPinIcon } from "lucide-react";
import { TisseoIcon } from "@/components/tisseo/icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LineDetails } from "@/lib/tisseo/get-line-details";

interface StopTooltipContentProps {
  stop: LineDetails["stopPointsWithSchedules"][0];
  line: LineDetails["line"];
}

export function StopTooltipContent({ stop, line }: StopTooltipContentProps) {
  const nextJourney = stop.schedules.stopAreas[0].schedules[0].journeys[0];
  const nextStopTime = nextJourney ? new Date(nextJourney.dateTime) : null;

  const getNextStopText = () => {
    if (!nextStopTime) return "Aucun arrêt prévu";
    if (isSameMinute(nextStopTime, new Date())) return "À l'approche";
    return formatDistanceToNowStrict(nextStopTime, { locale: fr, addSuffix: true });
  };

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
            <ClockIcon className="size-4" />
            <span>Prochain arrêt : {getNextStopText()}</span>
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
