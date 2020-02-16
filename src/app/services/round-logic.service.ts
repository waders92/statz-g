import { Injectable, OnInit } from '@angular/core';
import { IRound } from '../new-round/models/round';
import { Store } from '@ngrx/store';
import { RoundState } from '../reducers/rounds.reducer';
import { AddRound, UpdateRound } from '../actions/round.actions';
import { NewRoundConverter, IStatsDict } from '../new-round/converters/new-round-converter';
import { RoundDataService } from './round-data-service';
import { RoundStatCategories } from '../new-round/models/round-type-enums';

@Injectable({
  providedIn: 'root'
})
export class RoundLogicService {

  userId: string;

  constructor(
    private store: Store<RoundState>,
    private roundConverter: NewRoundConverter,
    private roundDataService: RoundDataService) { }

  public updateStoreForAdd(round: any) {
    this.store.dispatch(new AddRound(round));
  }

  public updateStoreForEdit(editedRound: any) {
    this.store.dispatch(new UpdateRound(editedRound));
  }

  public convertRoundFromJson(data: any): IRound {
    return this.roundConverter.convertRoundFromJson(data);
  }

  public addRound(round: IRound) {
    return this.roundDataService.addRound(round);
  }

  public updateRound(editedRound: IRound) {
    return this.roundDataService.updateRound(editedRound);
  }

  public load(id: string) {
    this.roundDataService.load(id);
  }

  public getRounds() {
    return this.roundDataService.getRounds();
  }

  public verifyInputs(statsDict: any, date: any): boolean {
    if (
      !date ||
      !statsDict[RoundStatCategories.Course] ||
      !statsDict[RoundStatCategories.FairwaysInReg] ||
      !statsDict[RoundStatCategories.GreeensInReg] ||
      !statsDict[RoundStatCategories.Score] ||
      !statsDict[RoundStatCategories.TotalBirdies] ||
      !statsDict[RoundStatCategories.TotalPars] ||
      !statsDict[RoundStatCategories.TotalPutts]
    ) {
      return false;
    }

    return true;
  }

  public adjustViewableRound(editedRound: any, round: any): void {
    editedRound.course = round.course;
    editedRound.score = round.score;
    editedRound.fairwaysInReg = round.fairwaysInReg;
    editedRound.greensInReg = round.greensInReg;
    editedRound.totalPutts = round.totalPutts;
    editedRound.totalBirdies = round.totalBirdies;
    editedRound.totalPars = round.totalPars;
  }
}
