import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DBService, Message } from 'src/app/_service/db.service';
import { Sensor } from 'src/app/_interface/sensor';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy {
  @Input() sensor: Sensor; 

  private updateInterval: any;
  private chartData: any;
  private messageData: Message;
  private lineSeries: any = [];

  showXAxis: boolean = true;
  showYAxis: boolean = true;

  showXAxisLabel: boolean = true;
  xAxisLabel: String = 'time';
  showYAxisLabel = true;
  yAxisLabel: String = 'value';


  constructor(private dbService: DBService) {}

  ngOnInit(): void {
    this.updateChart(10);

    this.updateInterval = setInterval(() => {
      this.updateChart(1);
    }, 3500);
  }


  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }

  private updateChart(elements) {
    this.dbService.getSensorData(this.sensor.clientId, this.sensor.sensorId, elements)
          .subscribe(
            (response) => {
              if(this.lineSeries.length === 0) {
                 response.forEach((message) => {
                  const timestampAsDate = new Date(message.time);

                  this.lineSeries.push(
                    {
                      name: `${timestampAsDate.getHours()}:${timestampAsDate.getMinutes()}:${timestampAsDate.getSeconds()}`,
                      value: message.value
                    });
                 });

                 this.messageData = response[Object.keys(response).length - 1];

                 this.chartData = 
                [{
                  name: this.messageData.sensorId,
                  series: this.lineSeries,
                },
                ]
              } else {
                this.messageData = response[Object.keys(response).length - 1];
              
                const now = new Date();

                if (this.lineSeries.length === 11) {
                  this.lineSeries = this.lineSeries.slice(1,11);
                }
                
                this.lineSeries.push(
                {
                  name: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
                  value: this.messageData.value
                });

                this.chartData = 
                [{
                  name: this.messageData.sensorId,
                  series: this.lineSeries,
                },
                ]
              }

              //console.log('TEST:' + this.chartData);
          })
  }
}




    /*
    const now = new Date();
    if (this.lineSeries.length === 11) {
      this.lineSeries = this.lineSeries.slice(1,11);
    }

    this.lineSeries.push(
      {
        name: now.getHours() + ':' +now.getMinutes() + ':' + now.getSeconds(),
        value: this.randomData
      }
    )

    return [
        {
          name: 'test temp',
          series: this.lineSeries,
        },
    ]
    */
