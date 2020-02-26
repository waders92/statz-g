import { Injectable } from '@angular/core';
import { IRound } from '../new-round/models/round';
import { IStatDisplayPackage } from '../stats/models/stat-display-package';
import { ISpecificStatPackage } from '../stats/models/specific-stat-package';

@Injectable({
  providedIn: 'root'
})

export class StatsLogicService {

  constructor() {}

  public setupStatCategoriesForDisplay(rounds: IRound[]): IStatDisplayPackage {
    const scorePerRoundAverage = this.calculateScoringAverage(rounds);
    const greensHitPerRoundAverage = this.calculateGreensHitAverage(rounds);
    const fairwaysHitPerRoundAverage = this.calculateFairwaysHitAverage(rounds);
    const puttsPerRndAverage = this.calculateTotalPutts(rounds);
    const birdiePerRndAverage = this.calculatBirdieAverage(rounds);
    const parsPerRndAverage = this.calculateParsPerRoundAverage(rounds);

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
        return this.getStatDetails(rounds, 'score');
      case 'greens':
        return this.getStatDetails(rounds, 'greensInReg');
      case 'fairways':
        return this.getStatDetails(rounds, 'fairwaysInReg');
      case 'putts':
        return this.getStatDetails(rounds, 'totalPutts');
      case 'birdies':
        return this.getStatDetails(rounds, 'totalBirdies');
      case 'pars':
        return this.getStatDetails(rounds, 'totalPars');
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

  private calculateTotalPutts(rounds: IRound[]): number {
   return rounds.reduce((a, b) => a + b.totalPutts, 0) / rounds.length;
  }

  private calculateParsPerRoundAverage(rounds: IRound[]): number {
    return rounds.reduce((a, b) => a + b.totalPars, 0) / rounds.length;
  }

  private calculatBirdieAverage(rounds: IRound[]): number {
    return rounds.reduce((a, b) => a + b.totalBirdies, 0) / rounds.length;
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
          stat: round[type]
        }
      );
    });

    return result;
  }
}
