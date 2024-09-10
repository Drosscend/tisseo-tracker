import { formatDistanceToNowStrict, isSameMinute } from "date-fns";
import { fr } from "date-fns/locale";
import { AccessibilityIcon, ArrowRightIcon, ClockIcon, InfoIcon, MapPinIcon } from "lucide-react";
import { TisseoIcon } from "@/components/tisseo/icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LineDetails } from "@/lib/tisseo/get-line-details";

interface StopInfoCardProps {
  stop: LineDetails["stopPointsWithSchedules"][0];
  line: LineDetails["line"];
}

export function StopInfoCard({ stop, line }: StopInfoCardProps) {
  const nextJourney = stop.schedules.stopAreas[0].schedules[0].journeys[0];
  const nextStopTime = nextJourney ? new Date(nextJourney.dateTime) : null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center space-x-2">
          <MapPinIcon className="text-primary size-5" />
          <h3 className="text-lg font-bold">{stop.stopPoint.name}</h3>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <AccessibilityIcon className="size-5" />
            <span>{stop.stopPoint.handicappedCompliance === "1" ? "Accessible" : "Non accessible"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowRightIcon className="size-5" />
            <span>Vers : {stop.stopPoint.destinations[0]?.name || "N/A"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TisseoIcon mode={line.transportMode.name} color={line.bgXmlColor} className="size-5" />
            <Badge variant="secondary">Ligne {stop.stopPoint.lines[0].short_name}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="size-5" />
            <span>
              Prochain arrêt :{" "}
              {!nextStopTime ? (
                <span className="font-bold text-red-600">Pas de prochain passage</span>
              ) : isSameMinute(new Date(nextStopTime), new Date()) ? (
                <span className="animate-pulse font-bold text-green-600">{"À l'approche"}</span>
              ) : (
                <span>{formatDistanceToNowStrict(new Date(nextStopTime), { locale: fr })}</span>
              )}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <InfoIcon className="size-5" />
            <span>Réseau : {stop.stopPoint.operatorCodes[0]?.operatorCode.network || "N/A"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
