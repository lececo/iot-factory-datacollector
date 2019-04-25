import { Component, OnInit, Input } from '@angular/core';
import {Sensor} from '../_interface/sensor';
import {SettingsComponent} from '../settings/settings.component';
import {CardsService} from '../dashboard/cards.service';
import {MatDialog} from '@angular/material';
import {ItemAddDialogComponent} from '../item-add-dialog/item-add-dialog.component';

@Component({
  selector: 'app-sensor-list-item',
  templateUrl: './sensor-list-item.component.html',
  styleUrls: ['./sensor-list-item.component.scss']
})
export class SensorListItemComponent implements OnInit {

  @Input() sensor$: Sensor;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  public addSensor() {
    const dialogRef = this.dialog.open(ItemAddDialogComponent, {
      width: '500px' , height: '500px', data: {sensor: this.sensor$}});
  }
}


