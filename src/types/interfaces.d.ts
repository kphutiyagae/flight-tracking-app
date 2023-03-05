export interface IFlightAPIResponse {
  time: number;
  states: string[];
}
export interface IFlight {
  icao24: string;
  callsign: string;
  origin_country: string;
  time_position: number;
  last_contact: number;
  longitude: number;
  latitude: number;
  baro_altitude: number;
  on_ground: boolean;
  velocity: number;
  true_track: number;
  vertical_rate: number;
  sensors: number[];
  geo_altitude: number;
  squak: string;
  spi: boolean;
  position_source: number;
  category: number;
}
export interface IFlightArray {
  flightsArray: IFlight[];
}

export interface IofError {
  error: boolean;
  message: string;
}

export interface IObserver {
  next: (flightDataArray: IFlight[] | IofError) => void;
  error: (error: IofError) => IofError;
}
