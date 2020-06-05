import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController, ToastController } from "@ionic/angular";

import { AddRoundComponent } from "../add-round/add-round.component";
import { NewCourseComponent } from "../new-course/new-course.component";
import { IRound } from "../new-round/models/round";
import { roundPropertiesAndInputValues } from "../new-round/models/round-type-values";
import { StatDetailsComponent } from "../stat-details/stat-details.component";
import { IStatPackageAverages } from "../stats/models/stat-package-averages";
import { RoundLogicService } from "./round-logic.service";

@Injectable({
  providedIn: "root",
})
export class ModalService {
  userId: string;

  constructor(
    private modalController: ModalController,
    private logicService: RoundLogicService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  public async presentNewRoundForm(roundItemInputs: any, userId?: string) {
    const modal = await this.modalController.create({
      component: AddRoundComponent,
      componentProps: {
        roundItems: roundItemInputs,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data !== undefined) {
        const newRound = this.logicService.convertRoundFromJson(data);
        newRound.userId = userId;
        this.logicService.addRound(newRound).subscribe((round) => {
          this.logicService.updateStoreForAdd(round);
          this.showToastForRound();
          this.router.navigateByUrl("/history");
        });
      }
    });

    return await modal.present();
  }

  public async presentEditRoundForm(round: IRound) {
    const modal = await this.modalController.create({
      component: AddRoundComponent,
      componentProps: {
        roundItems: roundPropertiesAndInputValues(),
        roundData: round,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data !== undefined) {
        const editedRound = this.logicService.convertRoundFromJson(
          data
        ) as IRound;
        editedRound.userId = round.userId;
        this.logicService.updateRound(editedRound).subscribe((rnd) => {
          this.logicService.adjustViewableRound(editedRound, rnd);
          this.logicService.updateStoreForEdit(editedRound);
          this.showToastForRound(true);
        });
      }
    });

    return await modal.present();
  }

  public async presentStatDetails(statPackage: IStatPackageAverages) {
    const modal = await this.modalController.create({
      component: StatDetailsComponent,
      componentProps: {
        statDetails: statPackage,
      },
    });

    return await modal.present();
  }

  private async showToastForRound(isEdit = false): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: isEdit
        ? "Your round was edited and saved!"
        : "Your round was added and saved!",
      duration: 3000,
      position: "bottom",
    });
    toast.present();
  }
}
