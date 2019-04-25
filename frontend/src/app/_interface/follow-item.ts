import {Sensor} from "./sensor";

export interface FollowItem {
  position: number;
  sensor: Sensor;
  isBig: boolean;
  widgetType: string;
}
