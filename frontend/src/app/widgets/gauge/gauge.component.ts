import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DBService, Message } from 'src/app/_service/db.service';
import { Observable } from 'rxjs';
import { Sensor } from 'src/app/_interface/sensor';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit, OnDestroy {
  @Input() sensor: Sensor;

  private updateInterval: any;
  private chartData: any;
  private messageData: Message;

  constructor(private dbService: DBService) {}

  ngOnInit(): void {
    this.updateChartData();

    this.sensor.updateInterval = 3000;

    this.updateInterval = setInterval(() => {
      this.updateChartData();
    }, this.sensor.updateInterval);
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }

  private updateChartData() {
    this.dbService.getSensorData(this.sensor.clientId, this.sensor.sensorId, 1) 
          .subscribe((response) => {this.messageData = response[0];
                                    this.chartData =  [
                                      {
                                        name: this.messageData.sensorId,
                                        value: this.messageData.value
                                      }
                                      ]
                                  });
  }
}
