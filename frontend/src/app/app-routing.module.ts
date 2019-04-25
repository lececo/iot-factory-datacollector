import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialDashboardComponent } from './dashboard/material-dashboard/material-dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AlertsComponent } from './alerts/alerts.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',                       
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'dashboard', component: MaterialDashboardComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'alerts', component: AlertsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
