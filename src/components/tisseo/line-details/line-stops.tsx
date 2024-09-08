import { formatDistanceToNowStrict, isSameMinute } from "date-fns";
import { format } from "date-fns/format";
import { fr } from "date-fns/locale/fr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { LineDetails } from "@/lib/tisseo/get-line-details";

export function LineStops({ stopPointsWithSchedules }: { stopPointsWithSchedules: LineDetails["stopPointsWithSchedules"] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Arrêts et Horaires</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          {stopPointsWithSchedules.map((stop, index) => (
            <div key={index} className="mb-6">
              <h3 className="mb-2 text-lg font-semibold">
                {stop.stopPoint.name} - {stop.stopPoint.destinations[0].name}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Heure</TableHead>
                    <TableHead>{"Temps d'attente"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stop.schedules.stopAreas[0].schedules[0].journeys.map((journey, journeyIndex) => (
                    <TableRow key={journeyIndex}>
                      <TableCell>{format(new Date(journey.dateTime), "HH:mm", { locale: fr })}</TableCell>
                      <TableCell>
                        {isSameMinute(new Date(journey.dateTime), new Date()) ? (
                          <span className="font-bold text-green-600">{"À l'approche"}</span>
                        ) : (
                          <span>{formatDistanceToNowStrict(new Date(journey.dateTime), { locale: fr })}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
