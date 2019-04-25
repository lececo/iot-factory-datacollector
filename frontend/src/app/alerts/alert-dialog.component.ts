import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { DBService } from '../_service/db.service';
import { Alert } from '../_interface/alert';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {

  alertType = new FormControl('', [Validators.required]);
  min = new FormControl('', [Validators.required]);
  max = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dbService: DBService,
              private autchService: AuthService) { 
    }

  ngOnInit() {
    this.alertType.setValue(this.data.selectedType);
    this.min.setValue(this.data.min);
    this.max.setValue(this.data.max);
  }

  getErrorMessage() {
    if (this.alertType.invalid || this.min.invalid || this.max.invalid) {
      return 'Dieses Feld muss ausgefüllt werden';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  async save() {
    // do nothing if a required field is missing
    if (this.alertType.invalid || this.min.invalid || this.max.invalid) {
      return;
    } else {
      if (this.data.isEditMode) {
        console.log(this.data.alert);
        const updatedAlert: Alert = this.data.alert;
        updatedAlert.mqtt = this.alertType.value === 'mqtt';
        updatedAlert.email = this.alertType.value === 'email';
        updatedAlert.min = this.min.value;
        updatedAlert.max = this.max.value;

        const result = await this.dbService.updateAlert(updatedAlert)
          .toPromise()
          .then((result) => {
            console.log(result);
            return result;
          });
      } else {
        const newAlert: Alert = {
          creator: this.autchService.getUserId(),
          sensorId: this.data.clientId,
          min: this.min.value,
          max: this.max.value,
          mqtt: this.alertType.value === 'mqtt',
          email: this.alertType.value === 'email',
        };

        const result = await this.dbService.createAlert(newAlert)
          .toPromise()
          .then((result) => {
            console.log(result);
            return result;
          });
      }
  
      this.dialogRef.close();
    }
  }
}
