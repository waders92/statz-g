import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoundStatValues } from '../new-round/models/round-type-enums';

@Component({
  selector: 'app-round-line-item',
  templateUrl: './round-line-item.component.html',
  styleUrls: ['./round-line-item.component.scss'],
})
export class RoundLineItemComponent implements OnInit {

  public inputType: string;
  public roundItems;
  public statsDict: { [key: string]: number | string; } = {};


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.inputType = RoundStatValues.Number;
  }

  public trackByFn() {
  }

  public dismiss() {

    if (this.inputType.valueOf() === 'undefined') {
      alert('Must enter a value');
      return;
    }

    this.modalController.dismiss({
      dismissed: true,
      data: this.statsDict
    });
  }

  public cancel() {
    this.modalController.dismiss();
  }
}
