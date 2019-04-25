import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Card } from '../card.model';
import { CardsService } from '../cards.service';
import { Subscription, Observable } from 'rxjs';
import {UserDataService} from '../../_service/user-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-material-dashboard',
  templateUrl: './material-dashboard.component.html',
  styleUrls: ['./material-dashboard.component.scss'],
})
export class MaterialDashboardComponent implements OnInit, OnDestroy {
  cards: Card[];
  subscription: Subscription;
  onSettingPage: boolean;


  constructor(private breakpointObserver: BreakpointObserver, private route: Router, private cardsService: CardsService) {
    this.subscription = this.cardsService.getCardSubject().subscribe(cards => {
      this.cards = cards;
    });
  }

  ngOnInit(): void {
    if (this.cards == null || this.cards === undefined) {
      console.log('MaterialDashboardComponent: keine karten');
    } else {
      this.cardsService.updateCards();
    }
    this.isOnSettingpage();

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeCard(card): void {
    this.cardsService.removeCard(card);
  }

  private isOnSettingpage(): void {
    if (this.route.url === '/settings') {
      this.onSettingPage = true;
    } else {
      this.onSettingPage = false;
    }
  }
}
