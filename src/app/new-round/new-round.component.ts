import { Component, OnInit } from '@angular/core';
import { roundPropertiesAndInputValues } from './models/round-type-values';
import { ModalController } from '@ionic/angular';
import { RoundLineItemComponent } from '../round-line-item/round-line-item.component';
import { NewRoundConverter } from './converters/new-round-converter';

@Component({
  selector: 'app-new-round',
  templateUrl: 'new-round.component.html',
  styleUrls: ['new-round.component.scss']
})
export class NewRoundComponent implements OnInit {

  public roundItems: any;

  constructor(private modalController: ModalController, private roundConverter: NewRoundConverter) {}

  ngOnInit() {
    this.roundItems = roundPropertiesAndInputValues();
  }

  public async postNewRound() {
    const modal = await this.modalController.create({
      component: RoundLineItemComponent,
      componentProps: {
        roundItems: this.roundItems
      }
    });

    modal.onDidDismiss()
    .then((data) => {
      const newRound = this.roundConverter.convertRoundFromJson(data);
      console.log(newRound);
    });

    return await modal.present();
  }
}
