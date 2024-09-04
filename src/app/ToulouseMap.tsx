import { Map, Marker } from "pigeon-maps";

export function MyMap() {
  return (
    <Map height={600} defaultCenter={[43.600718, 1.393456]} defaultZoom={11}>
      <Marker width={50} anchor={[43.600718, 1.393456]} />
    </Map>
  );
}
