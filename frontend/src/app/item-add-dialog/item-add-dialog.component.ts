import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Sensor} from '../_interface/sensor';
import {CardsService} from '../dashboard/cards.service';
import {FollowItem} from '../_interface/follow-item';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-item-add-dialog',
  templateUrl: './item-add-dialog.component.html',
  styleUrls: ['./item-add-dialog.component.scss']
})
export class ItemAddDialogComponent implements OnInit {

  followSensorForm: FormGroup;
  sdata: Sensor;
  optionsWidget: string[];

  selectedWidget: string;
  selectedWidgetIsBig: string;
  selectedPosition: number;

  constructor(public dialogRef: MatDialogRef<ItemAddDialogComponent>, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any, private cardService: CardsService) {
    this.sdata = data.sensor;
    this.optionsWidget = ['gauge', 'line-chart']; }

  ngOnInit() {
    this.followSensorForm = this.formBuilder.group({
      'widgetIsBig': this.selectedWidgetIsBig,
      'widgetType' : this.selectedWidget,
      'position' : this.selectedPosition
    });
  }

  add(): void {
    let addItem = new Object() as FollowItem;
    addItem.sensor = this.sdata;
    addItem.widgetType = this.selectedWidget;
    addItem.position = this.selectedPosition;

    if (this.selectedWidgetIsBig === "ja") {
      addItem.isBig = true;
    } else {
      addItem.isBig = false;
    }

    if ((addItem.sensor !== undefined) &&
      (addItem.isBig !== undefined) && (addItem.widgetType !== undefined) && (addItem.position !== undefined)) {
      this.cardService.addMockCard(addItem);
      this.dialogRef.close();
    } else {
      console.log("Es fehlt was");
    }


  }

  close(): void {
    this.dialogRef.close();
  }

}
