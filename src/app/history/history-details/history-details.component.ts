import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { RoundDataService } from 'src/app/services/round-data-service';
import { IRound } from 'src/app/new-round/models/round';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss'],
})
export class HistoryDetailsComponent implements OnInit {

  public round: IRound;
  public editedRound = {} as IRound;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private roundService: RoundDataService
    ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params._id !== undefined) {
        const id = params._id;
        this.roundService.getRound(id).subscribe((data) => {
          this.round = data[0];
        });
      }
    });
  }

  public presentEditRoundForm(round: IRound) {
    this.modalService.presentEditRoundForm(this.editedRound, round);
  }
}
