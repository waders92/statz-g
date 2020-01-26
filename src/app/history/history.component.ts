import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoundService } from '../services/round-service';
import { IRound } from '../new-round/models/round';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.scss']
})

export class HistoryComponent implements OnInit {

  public rounds: IRound[];

  constructor(private roundService: RoundService) {}

  ngOnInit() {
    this.roundService.load();
    this.roundService.getRounds().subscribe((data) => {
      this.rounds = data;
    });
  }
}
