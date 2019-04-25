import { Type } from '@angular/core';
import { Sensor } from '../_interface/sensor';

export class Widget {
  
  constructor(public component: Type<any>, public sensor: Sensor) {
  }
}