
import {Component, OnInit} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{
  mobileQuery: MediaQueryList;
  opened: boolean;

  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.opened = this._getSidenavStateFromLocalStorage();
  }

  private _getSidenavStateFromLocalStorage(): boolean {
    const opened = localStorage.getItem('sidenav-opened');

    // has not been saved yet
    if (!opened) {
      return true;
    }

    return opened === 'true' ? true : false;
  }

  public setSidenavStateInLocalStorage(state: boolean) {
    const stateString = state ? 'true' : 'false';

    localStorage.setItem('sidenav-opened', stateString);
  }
  
  public logout() {
    const loggedOut = this.authService.logout();
    
    if (loggedOut) {
      this.router.navigate(['/login'])
    }
  }
}
