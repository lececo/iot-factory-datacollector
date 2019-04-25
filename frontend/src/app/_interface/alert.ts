export interface Alert {
    id?: string;
    creator: string;  // basically the clientId
    sensorId: string;
    min: number;
    max: number;
    mqtt: boolean;
    email: boolean;
}
