import { Injectable } from '@angular/core';
import {UserData} from "../_interface/userData";
import {FollowItem} from "../_interface/follow-item";

@Injectable({
  providedIn: 'root'
})
export class UserDataService implements UserData{
  followList: FollowItem[];
  id: string;

  constructor(nameId,followList,) {
    this.id = nameId;
    this.followList = followList;
  }

  public getFollowList(){
    return this.followList;
  }
  public getNameId(){
    return this.id;
  }

  public setFollowList(followList) {
    this.followList = followList;
  }


}
