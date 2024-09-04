export interface Lines {
  expirationDate: string;
  lines: LinesClass;
}

export interface LinesClass {
  line: Line[];
}

export interface Line {
  bgXmlColor: string;
  color: string;
  fgXmlColor: string;
  geometry: Geometry[];
  id: string;
  messages: Message[];
  name: string;
  network: string;
  reservationMandatory: string;
  shortName: string;
  terminus: Terminus[];
  transportMode: TransportMode;
}

export interface Geometry {
  wkt: string;
}

export interface Message {
  content: string;
  id: string;
  importanceLevel: string;
  scope: string;
  title: string;
  type: string;
  url: string;
}

export interface Terminus {
  cityName: string;
  id: string;
  name: string;
}

export interface TransportMode {
  article: string;
  id: string;
  name: LineType;
}

export type LineType = "bus" | "tramway" | "métro" | "navette" | "téléphérique" | "Linéo" | "transport à la demande";

export interface StopPoints {
  expirationDate: string;
  physicalStops: PhysicalStops;
}

export interface PhysicalStops {
  physicalStop: PhysicalStop[];
}

export interface PhysicalStop {
  destinations: Destination[];
  handicappedCompliance: string;
  id: string;
  name: string;
  operatorCodes: OperatorCodeElement[];
  stopArea: StopArea;
  x: string;
  y: string;
}

export interface Destination {
  cityName: string;
  id: string;
  line: Line[];
  name: string;
}

export interface OperatorCodeElement {
  operatorCode: OperatorCodeOperatorCode;
}

export interface OperatorCodeOperatorCode {
  network: string;
  value: string;
}

export interface StopArea {
  cityName: string;
  id: string;
  name: string;
}

export interface StopSchedules {
  departures: Departures;
  expirationDate: string;
}

export interface Departures {
  stopAreas: StopArea[];
}
export interface StopArea {
  cityId: string;
  cityName: string;
  id: string;
  name: string;
  schedules: Schedule[];
  uniqueStopId: string;
}

export interface Schedule {
  destination: Destination;
  journeys: Journey[];
  line: Line;
  stop: Stop;
}

export interface Destination {
  cityId: string;
  cityName: string;
  id: string;
  name: string;
  way: string;
}

export interface Journey {
  dateTime: Date;
  realTime: string;
  waiting_time: string;
}

export interface Stop {
  handicappedCompliance: string;
  id: string;
  name: string;
  operatorCode: string;
}
