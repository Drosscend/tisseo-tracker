import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LineDetails } from "@/lib/tisseo/get-line-details";

export function LineInfos({ line }: { line: LineDetails["line"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Réseau: {line.network}</p>
        <p>Réservation: {line.reservationMandatory === "0" ? "Non" : "Oui"}</p>
      </CardContent>
    </Card>
  );
}
