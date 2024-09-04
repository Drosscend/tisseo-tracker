import type { Line, LineType } from "@/types/tisseo.type";
import { BusFrontIcon, CableCarIcon, PlaneIcon, TrainFrontTunnelIcon, TramFrontIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { capitalize } from "@/lib/text.utils";

const getIcon = (mode: LineType, color: string) => {
  switch (mode) {
    case "navette":
      return <PlaneIcon className="size-4" stroke={color} />;
    case "bus":
    case "Linéo":
    case "transport à la demande":
      return <BusFrontIcon className="size-4" stroke={color} />;
    case "métro":
      return <TrainFrontTunnelIcon className="size-4" stroke={color} />;
    case "tramway":
      return <TramFrontIcon className="size-4" stroke={color} />;
    case "téléphérique":
      return <CableCarIcon className="size-4" stroke={color} />;
    default:
      return null;
  }
};

export default function LinesTable({ lines }: { lines: Line[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ligne</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Réseau</TableHead>
          <TableHead>Mode</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {lines.map((line) => (
          <TableRow key={line.id}>
            <TableCell>
              <div className="flex items-center gap-2">{line.shortName}</div>
            </TableCell>
            <TableCell>{line.name}</TableCell>
            <TableCell>{line.network}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getIcon(line.transportMode.name, line.bgXmlColor)}
                {capitalize(line.transportMode.name)}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
