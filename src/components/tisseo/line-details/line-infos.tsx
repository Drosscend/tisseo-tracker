import { MessageCircleWarningIcon, RouteIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LineDetails } from "@/lib/tisseo/get-line-details";

export function LineInfos({ line }: { line: LineDetails["line"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations sur la ligne</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <RouteIcon className="size-5" />
          <span>Réseau: {line.network}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MessageCircleWarningIcon className="size-5" />
          <span>Réservation: {line.reservationMandatory === "0" ? "Non" : "Oui"}</span>
        </div>
      </CardContent>
    </Card>
  );
}
