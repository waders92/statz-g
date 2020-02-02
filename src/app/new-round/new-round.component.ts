import { Component, OnInit } from '@angular/core';
import { roundPropertiesAndInputValues } from './models/round-type-values';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-new-round',
  templateUrl: 'new-round.component.html',
  styleUrls: ['new-round.component.scss']
})
export class NewRoundComponent implements OnInit {

  public roundItems: any;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.roundItems = roundPropertiesAndInputValues();
  }

  public presentNewRoundForm() {
    this.modalService.presentNewRoundForm(this.roundItems);
  }
}
