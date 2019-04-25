import { Injectable } from '@angular/core';
import { DBService } from '../_service/db.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userId: string

  constructor(private dbService: DBService) { 
    this._userId = this.getUserIdFromLocalStorage();
  }
  
  public getUserId() : string {
    return this._userId;
  }

  public async register(email: string, password: string) {
    const response = await this.dbService.createUser(email, password)
        .toPromise()
        .then((result) => {
          return result
        })

    if(response.includes('Error')) {
      return {
        registered: false,
        message: response.replace('Error:', '')
      }
    }

    return {
      registered: true
    }
  }

  public async login(email: string, password: string) {
     const response = await this.dbService.login(email, password)
        .toPromise()
        .then((result) => {
          return result
        })
    
      if (response === 'Error: Wrong login data!') {
        return {
          loggedIn: false,
          message: response.replace('Error:', '')
        }
      }

      this._userId = response;
      
      this.setUserIdInLocalStorage(response);
      return {
        loggedIn: true
      } 
  }

  public async logout() {
    const response = await this.dbService.logout()
      .toPromise()
      .then((result) => {
        return result;
      })

    if (response === 'Success: You are logged out!') {
      this._userId = '';
      this.setUserIdInLocalStorage('');
      return true
    }

    return false;
  }

  private setUserIdInLocalStorage(userId : string): void {
    localStorage.setItem('userId', userId);
  }

  private getUserIdFromLocalStorage(): string {
    return localStorage.getItem('userId');
  }
}
