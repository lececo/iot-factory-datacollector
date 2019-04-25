import {Component, OnInit} from '@angular/core';
import {Sensor} from '../_interface/sensor';
import {DBService} from '../_service/db.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss']
})
export class SensorListComponent implements OnInit {

  public sensorList: Sensor[];

  constructor(private dbService: DBService) {
  }

  ngOnInit() {
    this.updateSensorList();
  }

  private updateSensorList(): void {
    const sensorResponse = this.dbService.getSensorList()
      .toPromise()
      .then((result) => {
        this.sensorList = <Sensor[]>result;
        return result;
      });
  }
}
