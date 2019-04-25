import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule, MatCardModule, MatIconModule, MatMenuModule, MatButtonModule } from '@angular/material';

import { MaterialDashboardComponent } from './material-dashboard/material-dashboard.component';
import { WidgetDirective } from './widget.directive';
import { WidgetWrapperComponent } from './widget-wrapper/widget-wrapper.component';

import { WidgetsModule } from '../widgets/widgets.module';
import { LineChartComponent } from '../widgets/line-chart/line-chart.component';

@NgModule({
  declarations: [
    MaterialDashboardComponent,
    WidgetDirective,
    WidgetWrapperComponent,
  ],
  imports: [
    CommonModule,
    WidgetsModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  providers:[
  ],
  exports: [
    MaterialDashboardComponent
  ],
})
export class DashboardModule { }
