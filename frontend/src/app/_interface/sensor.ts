export interface Sensor {
  clientId: string;
  sensorId: string;
  sensorValue?: number;
  sensorUnit: string;
  sensorState: number;
  active: boolean;
  updateInterval?: number;
}
