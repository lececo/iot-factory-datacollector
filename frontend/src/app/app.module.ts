import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatIconModule,
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatTableModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutComponent } from './layout/layout.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SettingsComponent } from './settings/settings.component';
import { AlertsComponent } from './alerts/alerts.component';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { SensorListItemComponent } from './sensor-list-item/sensor-list-item.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginPopupComponent } from './login/login-popup.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ItemAddDialogComponent } from './item-add-dialog/item-add-dialog.component';
import { AlertDialogComponent } from './alerts/alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SettingsComponent,
    AlertsComponent,
    SensorListComponent,
    SensorListItemComponent,
    LoginComponent,
    LoginPopupComponent,
    ItemAddDialogComponent,
    AlertDialogComponent
  ],
  entryComponents: [LoginPopupComponent, ItemAddDialogComponent, AlertDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    ReactiveFormsModule,
    LayoutModule,
    DashboardModule,
    HttpClientModule,
    MatRadioModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
