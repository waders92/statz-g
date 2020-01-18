import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RoundStatValues, RoundStatCategories } from '../new-round/models/round-type-enums';

@Component({
  selector: 'app-round-line-item',
  templateUrl: './round-line-item.component.html',
  styleUrls: ['./round-line-item.component.scss'],
})
export class RoundLineItemComponent {

  public roundItems; // template variable passed into modal
  public statsDict: { [key: string]: number | string; } = {};


  constructor(private modalController: ModalController) { }

  public trackByFn() {
  }

  public dismiss() {

    if (!this.verifyInputs()) {
      alert('Must enter all values');
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

  private verifyInputs(): boolean {
    if (
      !this.statsDict[RoundStatCategories.Course] ||
      !this.statsDict[RoundStatCategories.FairwaysInReg] ||
      !this.statsDict[RoundStatCategories.GreeensInReg] ||
      !this.statsDict[RoundStatCategories.Score] ||
      !this.statsDict[RoundStatCategories.TotalBirdies] ||
      !this.statsDict[RoundStatCategories.TotalPars] ||
      !this.statsDict[RoundStatCategories.TotalPutts]
    ) {
      return false;
    }

    return true;
  }
}
