import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GaugeComponent } from './gauge/gauge.component';

@NgModule({
  declarations: [
    LineChartComponent,
    GaugeComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,    
  ],
  exports: [
    LineChartComponent,
    GaugeComponent
  ],
  entryComponents: [
    LineChartComponent,
    GaugeComponent,
  ]
})
export class WidgetsModule { }
