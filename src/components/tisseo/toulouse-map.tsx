"use client";

import { GeoJson, Map, ZoomControl } from "pigeon-maps";
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
    <Map height={600} defaultCenter={[43.600718, 1.393456]} defaultZoom={11}>
      <GeoJson
        data={geoJsonData}
        styleCallback={(feature: { geometry: { type: string } }, hover: any) => {
          if (feature.geometry.type === "LineString") {
            return {
              strokeWidth: "4",
              stroke: `rgb${line.color}`,
              opacity: 0.8,
            };
          }
          return {};
        }}
      />
      <ZoomControl />
    </Map>
  );
}
