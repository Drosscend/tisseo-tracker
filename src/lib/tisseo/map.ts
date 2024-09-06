interface Coordinate {
  lat: number;
  lon: number;
}

export function parseWKT(wkt: string): Coordinate[] {
  const coordPairs = wkt.match(/\d+\.\d+\s+\d+\.\d+/g) || [];
  return coordPairs.map((pair) => {
    const [lon, lat] = pair.split(" ").map(Number);
    return { lon, lat };
  });
}
