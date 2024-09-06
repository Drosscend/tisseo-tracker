import { MapPinIcon } from "lucide-react";
import { TisseoIcon } from "@/components/tisseo/icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LineDetails } from "@/lib/tisseo/get-line-details";

interface LineInfoCardProps {
  line: LineDetails["line"];
}

export function LineInfoCard({ line }: LineInfoCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center space-x-2">
          <MapPinIcon className="text-primary size-5" />
          <h3 className="text-lg font-bold">{line.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <TisseoIcon mode={line.transportMode.name} color={line.bgXmlColor} className="size-5" />
          <Badge variant="secondary">Ligne {line.shortName}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
