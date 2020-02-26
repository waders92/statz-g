import { Injectable } from '@angular/core';
import { IRound } from '../new-round/models/round';
import { IStatDisplayPackage } from '../stats/models/stat-display-package';
import { ISpecificStatPackage } from '../stats/models/specific-stat-package';
import { RoundKeyValues } from '../new-round/models/round-type-enums';

@Injectable({
  providedIn: 'root'
})

export class StatsLogicService {

  constructor() {}

  public setupStatCategoriesForDisplay(rounds: IRound[]): IStatDisplayPackage {
    const scorePerRoundAverage = this.calculateScoringAverage(rounds);
    const greensHitPerRoundAverage = this.calculateGreensHitAverage(rounds);
    const fairwaysHitPerRoundAverage = this.calculateFairwaysHitAverage(rounds);
    const puttsPerRndAverage = this.calculateStatAverage(rounds, RoundKeyValues.Putts);
    const birdiePerRndAverage = this.calculateStatAverage(rounds, RoundKeyValues.Birdies);
    const parsPerRndAverage = this.calculateStatAverage(rounds, RoundKeyValues.Pars);

    return {
      scoringAverage: scorePerRoundAverage,
      greensInRegAverage: greensHitPerRoundAverage,
      fairwaysInRegAverage: fairwaysHitPerRoundAverage,
      puttsPerRoundAverage: puttsPerRndAverage,
      birdieAverage: birdiePerRndAverage,
      parsPerRoundAverage: parsPerRndAverage
    };
  }

  public getSpecificStatPackage(statType: string, rounds: IRound[]): ISpecificStatPackage[] {
    switch (statType) {
      case 'score':
        return this.getStatDetails(rounds, RoundKeyValues.Score);
      case 'greens':
        return this.getStatDetails(rounds, RoundKeyValues.Greens);
      case 'fairways':
        return this.getStatDetails(rounds, RoundKeyValues.Fwys);
      case 'putts':
        return this.getStatDetails(rounds, RoundKeyValues.Putts);
      case 'birdies':
        return this.getStatDetails(rounds, RoundKeyValues.Birdies);
      case 'pars':
        return this.getStatDetails(rounds, RoundKeyValues.Pars);
    }
  }

  public populateDetailsTitle(tempTitle: string): string {
    switch (tempTitle) {
      case RoundKeyValues.Score:
        return 'Scoring Details';
      case RoundKeyValues.Greens:
        return 'Greens In Reg Details';
      case RoundKeyValues.Fwys:
        return 'Fairways In Reg Details';
      case RoundKeyValues.Putts:
        return 'Putting Details';
      case RoundKeyValues.Birdies:
        return 'Birdie Details';
      case RoundKeyValues.Pars:
        return 'Par Details';
    }
  }

  private calculateScoringAverage(rounds: IRound[]): number {
    return rounds.reduce((a, b) => a + b.score, 0) / rounds.length;
  }

  private calculateGreensHitAverage(rounds: IRound[]): number {
    const allGreensHit = rounds.reduce((a, b) => a + b.greensInReg, 0);
    const totalRounds = rounds.length;
    const totalPossibleGreens = totalRounds * 18;
    const greensAverage = allGreensHit / totalPossibleGreens;
    return this.convertAverageToPercent(greensAverage);
  }

  private calculateFairwaysHitAverage(rounds: IRound[]): number {
    const allFairwaysHit = rounds.reduce((a, b) => a + b.fairwaysInReg, 0);
    const totalRounds = rounds.length;
    const totalPossibleFairways = totalRounds * 14; // figure out how to deal with this
    const fwyAverage = allFairwaysHit / totalPossibleFairways;
    return this.convertAverageToPercent(fwyAverage);
  }

  private calculateStatAverage(rounds: IRound[], type: string): number {
    return rounds.reduce((a, b) => a + b[type], 0) / rounds.length;
   }

  private convertAverageToPercent(avg: number): number {
    return avg * 100;
  }

  private getStatDetails(rounds: IRound[], type: string): ISpecificStatPackage[] {
    const result: ISpecificStatPackage[] = [];

    rounds.forEach((round) => {
      result.push(
        {
          date: round.date,
          course: round.course,
          stat: round[type],
          statType: type
        }
      );
    });

    return result;
  }
}
