import type { Line } from "@/types/tisseo.type";
import Link from "next/link";
import { TisseoIcon } from "@/components/tisseo/icon";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { capitalize } from "@/lib/text.utils";

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
            <TableCell className="hover:underline hover:underline-offset-4">
              <Link href={`/lines/${line.id}`}>
                <span>{line.name}</span>
              </Link>
            </TableCell>
            <TableCell>{line.network}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <TisseoIcon mode={line.transportMode.name} color={line.bgXmlColor} />
                {capitalize(line.transportMode.name)}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
