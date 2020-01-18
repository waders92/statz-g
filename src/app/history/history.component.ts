import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoundService } from '../services/round-service';
import { Subscription } from 'rxjs';
import { IRound } from '../new-round/models/round';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.scss']
})

export class HistoryComponent implements OnInit, OnDestroy {

  public rounds: IRound[] = [];
  private roundSubscription = new Subscription();

  constructor(private roundService: RoundService) {}

  ngOnInit() {
    this.roundSubscription = this.roundService.getRounds().subscribe((data) => {
      this.rounds = data;
    });
  }

  ngOnDestroy() {
    this.roundSubscription.unsubscribe();
  }
}
