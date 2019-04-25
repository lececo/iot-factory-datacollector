import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {FollowItem} from "../_interface/follow-item";
import {Sensor} from "../_interface/sensor";
import { Alert } from '../_interface/alert';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  private commentsUrl = 'http://localhost:8080/';
  randomData: number;

  constructor(private http: HttpClient) {}

  // Important: If you try to use a route (except createUser and login) and you are not
  // logged in, you will get back null...so basically nothing.

  // On Success you get the id back of the created user.
  // Else you get Error Messages back.
  public createUser(email, password){
    var url = this.commentsUrl + 'createUser' + '?email=' + email + '&password=' + password;

    //debug
    console.log(url);

    return this.http.get(url, {responseType: "text"});
  }

  // On Success returns 0 as String.
  public deleteUser(id){
    var url = this.commentsUrl + "deleteUser" + "?id=" + id;

    //debug
    console.log(url);
    return this.http.get<String>(url);
  }


  public updateUser(id, userData: FollowItem[]) {
    var url = this.commentsUrl + 'updateUser' + '?id=' + id;

    // debug
    console.log(url);
    console.log(userData);
    return this.http.post(url, JSON.stringify(userData));
  }

  public getUserData(id): Observable<FollowItem[]> {
    var url = this.commentsUrl + "getUserData" + "?id=" + id;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<FollowItem[]>(url, httpOptions);
  }

  public getSensorList() {
    var url = this.commentsUrl + "getOnlineSensors";
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<Sensor[]>(url, httpOptions);
  }

  // On Success you get the id back of the logged in user.
  // Else you get Error Message back.
  public login(email, password){
    const url = this.commentsUrl + "login" + "?email=" + email + "&password=" + password;
    return this.http.get(url, {responseType: "text"});
  }

  // On Success you get the a success Message back.
  // Else you get Error Message back.
  public logout(){
    const url = this.commentsUrl + "logout";
    return this.http.get(url, {responseType: "text"});
  }


  // On Success you get an id back for the created alert. Save the id somewhere,
  // you will need it if you delete or update this alert.
  public createAlert(alert: Alert){
    var url = this.commentsUrl + 'createAlert';

    //debug
    console.log(url);
    
    return this.http.post(
      url,
      JSON.stringify(alert),
      {responseType: "text"}
     );
  }

  // the alertId is the id you got, when you created this alert.
  public updateAlert(alert: Alert){
    var url = this.commentsUrl + 'updateAlert';

    //debug
    console.log(url);
    
    return this.http.post(
      url,
      JSON.stringify(alert)
     );
  }

  // The alertId is the id you got, when you created this alert.
  // Return on Success 0.
  public deleteAlert(alertId){
    var url = this.commentsUrl + 'deleteAlert' + "?id=" + alertId;

    //debug
    console.log(url);
    
    return this.http.get(url, {responseType: "text"});
  }

  // parameter userid
  public getAlertList(userId: string){
    var url = this.commentsUrl + 'getAlertList' + "?id=" + userId;;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.get<Alert[]>(url, httpOptions);
  }


  public getSensorData(clientId, sensorId, elementCount): Observable<Message[]> {
    var url = this.commentsUrl + "getSpecificSensorDataByElements" + "?client=" + clientId + "&sensor=" + sensorId + "&elements=" + elementCount;
    return this.http.get<Message[]>(url);
  }
}

export interface Message {
        topic: string,
        clientId: string,
        sensorId: string,
        value: number,
        unit: string,
        time: string
}

