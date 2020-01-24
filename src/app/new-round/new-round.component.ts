import { Component, OnInit } from '@angular/core';
import { roundPropertiesAndInputValues } from './models/round-type-values';
import { ModalController, Events, ToastController } from '@ionic/angular';
import { RoundLineItemComponent } from '../round-line-item/round-line-item.component';
import { NewRoundConverter } from './converters/new-round-converter';
import { RoundService } from '../services/round-service';

@Component({
  selector: 'app-new-round',
  templateUrl: 'new-round.component.html',
  styleUrls: ['new-round.component.scss']
})
export class NewRoundComponent implements OnInit {

  public roundItems: any;

  constructor(
    private modalController: ModalController,
    private roundConverter: NewRoundConverter,
    private roundService: RoundService,
    private events: Events,
    private toastCtrl: ToastController
    ) {}

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
      if (data && data.data !== undefined) {
        const newRound = this.roundConverter.convertRoundFromJson(data);
        this.roundService.addRound(newRound).subscribe((round) => {
          this.events.publish('new-round', round);
          // redirect to history page?
          this.showToastForNewRound();
        });
      }
    });

    return await modal.present();
  }

  private async showToastForNewRound(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Your round was added and saved!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
