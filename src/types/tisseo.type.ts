export interface ApiResponse {
  expirationDate?: string;
  [key: string]: unknown;
}

export interface LinesResponse extends ApiResponse {
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
  importanceLevel: MessageImportanceLevel;
  scope: MessageScope;
  title: string;
  type: string;
  url: string;
}

export type MessageImportanceLevel = "important" | "normal";
export type MessageScope = "line" | "event" | "global";

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

export interface StopPointsResponse extends ApiResponse {
  physicalStops: PhysicalStops;
}

export interface PhysicalStops {
  physicalStop: PhysicalStop[];
}

export interface PhysicalStop {
  destinations: Destination[];
  handicappedCompliance: string;
  id: string;
  lines: {
    short_name: string;
  }[];
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

export interface StopSchedulesResponse extends ApiResponse {
  departures: Departures;
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

export interface MessagesResponse extends ApiResponse {
  messages: Messages[];
}

export interface Messages {
  message: Message;
  lines?: Line[];
}
