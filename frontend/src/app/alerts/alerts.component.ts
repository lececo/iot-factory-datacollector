import { Component, OnInit } from '@angular/core';
import { Sensor } from '../_interface/sensor';
import { DBService } from '../_service/db.service';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from './alert-dialog.component';
import { Alert } from '../_interface/alert';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alerts: Alert[] = [];
  sensors: Sensor[] = [];

  alertColumns: string[] = ['sensorId', 'creator', 'alertType', 'min', 'max', 'actions'];
  sensorColumns: string[] = ['sensorId', 'unit', 'actions'];

  constructor(private dbService: DBService,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  async ngOnInit() {
    this.sensors = await this.getSensors();
    this.alerts = await this.getAlerts();
  }

  private async getSensors() {
      const sensorsResponse = await this.dbService.getSensorList()
        .toPromise()
        .then((result) => {
          console.log('sensorResult');
          console.log(result);
          return result;
        })

      return sensorsResponse;
  }

  private async getAlerts() {
    const alertsResponse = await this.dbService.getAlertList(this.authService.getUserId())
      .toPromise()
      .then((result) => {
        console.log('alertsResult');
        console.log(result);
        return result;
      });

      return alertsResponse;
  }

  public openAddDialog(sensor: Sensor): void {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '800px',
      data: {
         isEditMode: false,
         clientId: sensor.clientId
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      this.alerts = await this.getAlerts();
    });
  }

  public openEditDialog(alert: Alert): void {
    let alertType: string;

    if (alert.mqtt) {
      alertType = 'mqtt' 
    } else {
      alertType = 'email'
    }

    this.dialog.open(AlertDialogComponent, {
      width: '800px',
      data: {
        isEditMode: true,
        clientId: alert.sensorId,
        typeSelected: alertType,
        min: alert.min,
        max: alert.max,
        alert: alert,
     }
    });
  }

  public async deleteAlert(alert: Alert) {
    const result = await this.dbService.deleteAlert(alert.id)
      .toPromise()
      .then(() => {
        console.log(result);
        return result;
      });

      this.alerts = await this.getAlerts();
  }
}
