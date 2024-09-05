"use client";

import { MapPin } from "lucide-react";
import { GeoJson, Map, ZoomControl } from "pigeon-maps";
import { useState } from "react";
import { TisseoIcon } from "@/components/tisseo/icon";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { LineDetails } from "@/lib/tisseo/fetch-line-details";

interface Coordinate {
  lat: number;
  lon: number;
}

function parseWKT(wkt: string): Coordinate[] {
  const coordPairs = wkt.match(/\d+\.\d+\s+\d+\.\d+/g) || [];
  return coordPairs.map((pair) => {
    const [lon, lat] = pair.split(" ").map(Number);
    return { lon, lat };
  });
}

export function ToulouseMap({ line }: { line: LineDetails["line"] }) {
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);

  // Convert the WKT geometry to GeoJSON
  const coordinates = parseWKT(line.geometry[0].wkt);
  const lineStringCoordinates = coordinates.map((coord) => [coord.lon, coord.lat]);

  const geoJsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: lineStringCoordinates,
        },
        properties: {
          name: line.name,
          shortName: line.shortName,
        },
      },
    ],
  };

  return (
    <div className="relative">
      <Map height={600} defaultCenter={[43.600718, 1.393456]} defaultZoom={11}>
        <GeoJson
          data={geoJsonData}
          styleCallback={(feature: { geometry: { type: string } }, hover: boolean) => {
            if (feature.geometry.type === "LineString") {
              return {
                strokeWidth: hover ? "6" : "4",
                stroke: `rgb${line.color}`,
                opacity: hover ? 1 : 0.8,
              };
            }
            return {};
          }}
          onMouseOver={({ payload }) => {
            setHoveredFeature(payload);
          }}
          onMouseOut={() => {
            setHoveredFeature(null);
          }}
        />
        <ZoomControl />
      </Map>
      {hoveredFeature && (
        <div className="absolute right-4 top-4">
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center space-x-2">
                <MapPin className="text-primary size-5" />
                <h3 className="text-lg font-bold">{hoveredFeature.properties.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <TisseoIcon mode={line.transportMode.name} color={line.bgXmlColor} className="size-5" />
                <Badge variant="secondary">Line {hoveredFeature.properties.shortName}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
