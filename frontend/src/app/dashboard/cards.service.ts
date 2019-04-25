import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Card} from './card.model';
import {CardFactory} from './cardFactory';
import {DBService} from '../_service/db.service';
import {FollowItem} from '../_interface/follow-item';
import {AuthService} from '../auth/auth.service';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private cardsSubject: BehaviorSubject<Card[]>;
  private cards: Card[];
  private userItems: FollowItem[];

  constructor(private dbService: DBService, private authService: AuthService) {
    this.userItems = [];
    this.updateCards();
    this.cardsSubject = <BehaviorSubject<Card[]>>new BehaviorSubject([]);
  }

  public getCardSubject(): Observable<any> {
    return this.cardsSubject.asObservable();
  }

  public async removeCard(card: Card) {
    let pNumber = card.position;
    this.userItems.splice(pNumber, 1);
    this.setItemPosition();
    const result = await this.dbService.updateUser(this.authService.getUserId(), this.userItems)
      .toPromise()
      .then((result) => {
        console.log(result);
        return result;
      });
    this.updateCards();
  }

  public async addMockCard(item: FollowItem) {
    this.addInPosition(item);
    const result = await this.dbService.updateUser(this.authService.getUserId(), this.userItems)
      .toPromise()
      .then((result) => {
        console.log(result);
        return result;
      });
    this.updateCards();
  }

  private addInPosition(item: FollowItem) {
    if (this.userItems.length > 0) {
      let pNumber = item.position;
      this.userItems.splice(pNumber - 1, 0, item);
    } else {
      this.userItems.push(item);
    }
    this.setItemPosition();
    console.log(this.userItems);
  }

  private setItemPosition() {
    for ( let item of this.userItems) {
      item.position = this.userItems.indexOf(item);
    }
  }

  public async updateCards() {
    const result1 = await this.dbService.getUserData(this.authService.getUserId())
      .toPromise()
      .then((result) => {
        console.log(result);
        return result;
      });

    if (result1 !== null) {
      this.userItems = result1;

      let cardFactory = new CardFactory();
      let cards = cardFactory.buildCards(this.userItems);

      this.cards = cards;
      this.cardsSubject.next(this.cards);
    }
  }


}
