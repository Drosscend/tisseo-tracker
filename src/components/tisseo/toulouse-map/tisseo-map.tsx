"use client";

import { GeoJson, Map, Overlay } from "pigeon-maps";
import { useMemo, useState } from "react";
import { StopInfoCard } from "@/components/tisseo/toulouse-map/stop-info-card";
import type { LineDetails, StopPointWithSchedules } from "@/lib/tisseo/get-line-details";
import { parseWKT } from "@/lib/tisseo/map";
import { LineInfoCard } from "./line-info-card";
import { StopMarker } from "./stop-marker";
import { ZoomControl } from "./zoom-control";

interface ToulouseMapProps {
  line: LineDetails["line"];
  stopPointsWithSchedules: StopPointWithSchedules[];
}

export function TisseoMap({ line, stopPointsWithSchedules }: ToulouseMapProps) {
  const [hoveredLine, setHoveredLine] = useState<null | LineDetails["line"]>(null);
  const [hoveredStop, setHoveredStop] = useState<null | StopPointWithSchedules>(null);
  const [zoom, setZoom] = useState<number>(13);

  const { center, geoJsonData } = useMemo(() => {
    const coordinates = parseWKT(line.geometry[0].wkt);
    const lineStringCoordinates = coordinates.map((coord) => [coord.lon, coord.lat]);

    // Calculate the center of the line
    const centerLon = lineStringCoordinates.reduce((sum, coord) => sum + coord[0], 0) / lineStringCoordinates.length;
    const centerLat = lineStringCoordinates.reduce((sum, coord) => sum + coord[1], 0) / lineStringCoordinates.length;

    return {
      center: [centerLat, centerLon] as [number, number],
      geoJsonData: {
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
      },
    };
  }, [line]);

  const [mapCenter, setMapCenter] = useState<[number, number]>(center);

  const handleZoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 1, 18));
  const handleZoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 1, 1));

  const handleBoundsChange = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    setMapCenter(center);
    setZoom(zoom);
  };

  const handleLineHover = (payload: LineDetails["line"] | null) => setHoveredLine(payload);
  const handleStopHover = (stop: StopPointWithSchedules | null) => setHoveredStop(stop);

  return (
    <div className="relative">
      <Map height={600} center={mapCenter} zoom={zoom} onBoundsChanged={handleBoundsChange}>
        <GeoJson
          data={geoJsonData}
          styleCallback={(feature: { geometry: { type: string } }, hover: boolean) => {
            if (feature.geometry.type === "LineString") {
              return {
                strokeWidth: hover ? 6 : 4,
                stroke: `rgb${line.color}`,
                opacity: hover ? 1 : 0.8,
              };
            }
            return {};
          }}
          onMouseOver={({ payload }) => handleLineHover(payload)}
          onMouseOut={() => handleLineHover(null)}
        />

        {stopPointsWithSchedules.map((stop) => (
          <Overlay key={stop.stopPoint.id} anchor={[parseFloat(stop.stopPoint.y), parseFloat(stop.stopPoint.x)]}>
            <StopMarker zoom={zoom} onMouseHover={() => handleStopHover(stop)} onMouseLeave={() => handleStopHover(null)} />
          </Overlay>
        ))}

        <ZoomControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </Map>

      {hoveredLine && (
        <div className="absolute right-4 top-4">
          <LineInfoCard line={line} />
        </div>
      )}

      {hoveredStop && (
        <div className="absolute right-4 top-4">
          <StopInfoCard stop={hoveredStop} line={line} />
        </div>
      )}
    </div>
  );
}
