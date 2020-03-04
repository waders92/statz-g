import { Injectable, OnInit } from '@angular/core';
import { IRound } from '../new-round/models/round';
import { Store } from '@ngrx/store';
import { RoundState } from '../reducers/rounds.reducer';
import { AddRound, UpdateRound } from '../actions/round.actions';
import { NewRoundConverter } from '../new-round/converters/new-round-converter';
import { RoundDataService } from './round-data-service';
import { RoundStatCategories } from '../new-round/models/round-type-enums';
import * as _ from 'lodash';
import * as moment from 'moment';
import { IYearlyRounds } from '../stats/models/yearly-rounds';
import { Months } from '../stats/models/month-enums';
import { IMonthlyRounds } from '../stats/models/monthly-rounds';

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
    editedRound.nineHoleRound = round.nineHoleRound;
  }

  public getMonthlyRoundsByYear(rounds: IRound[], selectedYear: number) {
    const currentYearRounds: IRound[] = [];
    rounds.map((rnd) => {
      const roundString = rnd.date.toString();
      const roundYear = Number(roundString.substring(0, 4));
      if (selectedYear === roundYear) {
        currentYearRounds.push(rnd);
      }
    });

    const result = this.getMonthlyRounds(currentYearRounds, selectedYear);
    return result;
  }

  public getAvailableYears(rounds: IRound[]) {
    const dates = rounds.map(r => r.date);
    const dateArr = [];

    dates.map((date) => {
      const roundString = date.toString();
      const roundYear = Number(roundString.substring(0, 4));
      dateArr.push(roundYear);
    });

    const distinctYears = [...new Set(dateArr)];
    return distinctYears;
  }

  getMonthlyRounds(rounds: IRound[], currentYear: number): IYearlyRounds {
    let result = this.buildEmptyYearlyRoundObject(rounds);
    rounds.forEach((round) => {
      const momentDate = moment(round.date);
      const numMonth = momentDate.month();
      const stringMonth = this.convertDateMonthToString(numMonth);
      result.year = currentYear.toString();
      result = this.buildMonthlyRounds(stringMonth, round, result);
    });

    return result;
  }

  buildEmptyYearlyRoundObject(rounds: IRound[]): IYearlyRounds {
    return {
      year: '',
      months: [],
      rounds
    };
  }

  buildMonthlyRounds(month: string, round: IRound, result: IYearlyRounds): IYearlyRounds {
    const monthlyResult = { title: '', rounds: [] } as IMonthlyRounds;
    switch (month) {
      case Months.January:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.February:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.March:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.April:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.May:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.June:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.July:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.August:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.September:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.October:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.November:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
      case Months.December:
        monthlyResult.title = month;
        monthlyResult.rounds.push(round);
        break;
    }

    const monthExists = result.months.filter(m => m.title === monthlyResult.title).pop();
    if (monthExists) {
      monthExists.rounds.push(monthlyResult.rounds[0]);

    } else {
       result.months.push(monthlyResult);
    }

    return result;
  }

  convertDateMonthToString(num: number): string {
    return moment().month(num ).format('MMMM');
  }
 }
