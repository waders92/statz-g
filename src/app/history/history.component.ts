import { Component, OnInit } from '@angular/core';
import { IRound } from '../new-round/models/round';
import { RoundLogicService } from '../services/round-logic.service';

@Component({
  selector: 'app-history',
  templateUrl: 'history.component.html',
  styleUrls: ['history.component.scss']
})

export class HistoryComponent implements OnInit {

  public rounds: IRound[];

  constructor(private logicService: RoundLogicService) {}

  ngOnInit() {
    this.logicService.load();
    this.logicService.getRounds().subscribe((data) => {
      this.rounds = data;
    });
  }
}
