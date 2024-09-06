"use client";

import { GeoJson, Map, Overlay } from "pigeon-maps";
import { useState } from "react";
import type { LineDetails } from "@/lib/tisseo/get-line-details";
import { parseWKT } from "@/lib/tisseo/map";
import { LineInfoCard } from "./line-info-card";
import { StopMarker } from "./stop-marker";
import { ZoomControl } from "./zoom-control";

export function ToulouseMap({ line, stopPointsWithSchedules }: LineDetails) {
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState<[number, number]>([43.600718, 1.393456]);

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

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 1));
  };

  return (
    <div className="relative">
      <Map
        height={600}
        defaultCenter={center}
        zoom={zoom}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
      >
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
        {stopPointsWithSchedules.map((stop) => (
          <Overlay key={stop.stopPoint.id} anchor={[parseFloat(stop.stopPoint.y), parseFloat(stop.stopPoint.x)]}>
            <StopMarker stop={stop} line={line} zoom={zoom} />
          </Overlay>
        ))}
        <ZoomControl onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      </Map>
      {hoveredFeature && (
        <div className="absolute right-4 top-4">
          <LineInfoCard feature={hoveredFeature} line={line} />
        </div>
      )}
    </div>
  );
}
