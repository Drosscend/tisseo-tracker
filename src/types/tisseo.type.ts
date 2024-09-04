export interface Line {
  id: string;
  shortName: string;
  name: string;
  network: string;
  color: string;
  bgXmlColor: string;
  fgXmlColor: string;
  transportMode: TransportMode;
  terminus?: StopArea[];
  messages?: Message[];
  geometry?: Geometry[];
}

export type LineType = "bus" | "tramway" | "métro" | "navette" | "téléphérique" | "Linéo" | "transport à la demande";

export interface TransportMode {
  id: string;
  article: string;
  name: LineType;
}

export interface StopArea {
  id: string;
  name: string;
  cityName: string;
}

export interface Message {
  id: string;
  content: string;
  date: string;
}

export interface Geometry {
  wkt: string;
}

export interface StopSchedule {
  dateTime: string;
  realTime: string;
  line: {
    name: string;
    shortName: string;
    network: string;
    color: string;
  };
  destination: {
    name: string;
    cityName: string;
  }[];
}

export interface StopAreaWithSchedules {
  id: string;
  name: string;
  cityName: string;
  schedules: StopSchedule[];
}

export interface LineDetails {
  line: Line;
  schedules: StopAreaWithSchedules[];
}

export interface LinesResponse {
  lines: {
    line: Line[];
  };
}

export interface StopSchedulesResponse {
  stopAreas: StopAreaWithSchedules[];
}
