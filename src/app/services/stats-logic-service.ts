import { Injectable } from '@angular/core';
import { IRound } from '../new-round/models/round';
import { IStatDisplayPackage } from '../stats/models/stat-display-package';
import { ISpecificStatPackage } from '../stats/models/specific-stat-package';
import { RoundKeyValues } from '../new-round/models/round-type-enums';
import { StatDisplayPackageTitleEnum } from '../stats/models/stat-display-package-enum';
import { IStatPackageAverages } from '../stats/models/stat-package-averages';

@Injectable({
  providedIn: 'root'
})

export class StatsLogicService {

  constructor() {}

  public setupStatCategoriesForDisplay(rounds: IRound[], isNineHoleRound = false): IStatDisplayPackage {
    const scorePerRoundAverage = this.calculateScoringAverage(rounds);
    const greensHitPerRoundAverage = this.calculateGreensHitAverage(rounds, isNineHoleRound);
    const fairwaysHitPerRoundAverage = this.calculateFairwaysHitAverage(rounds, isNineHoleRound);
    const puttsPerRndAverage = this.calculateStatAverage(rounds, RoundKeyValues.Putts);
    const birdiePerRndAverage = this.calculateStatAverage(rounds, RoundKeyValues.Birdies);
    const parsPerRndAverage = this.calculateStatAverage(rounds, RoundKeyValues.Pars);

    return {
      score: scorePerRoundAverage,
      greensInReg: greensHitPerRoundAverage,
      fairwaysInReg: fairwaysHitPerRoundAverage,
      totalPutts: puttsPerRndAverage,
      totalBirdies: birdiePerRndAverage,
      totalPars: parsPerRndAverage
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

  public appendAverageToCategory(statsPackage: IStatDisplayPackage, specificStatPackages: ISpecificStatPackage[]): IStatPackageAverages {
   const statType = specificStatPackages[0].statType;
   const statAverage = statsPackage[statType];

   return {
     statAverage,
     statType,
     detailsPackage: specificStatPackages
   };
  }

  public appendPercentageOptionToCategory(statPackage: IStatPackageAverages): IStatPackageAverages {
    const shouldAppendPercentage = this.isCategoryPercentType(statPackage.statType);
    statPackage.isPercentageStat = shouldAppendPercentage;
    return statPackage;
  }

  private isCategoryPercentType(input: string): boolean {
    if (input.includes('greens') || input.includes('fairways')) {
      return true;
    }

    return false;
  }

  private calculateScoringAverage(rounds: IRound[]): number {
    return rounds.reduce((a, b) => a + b.score, 0) / rounds.length;
  }

  private calculateGreensHitAverage(rounds: IRound[], isNineHoleRound: boolean = false): number {
    let greensTotalForRound: number;
    const allGreensHit = rounds.reduce((a, b) => a + b.greensInReg, 0);
    const totalRounds = rounds.length;
    isNineHoleRound ? greensTotalForRound = 9 : greensTotalForRound = 18;
    const totalPossibleGreens = totalRounds * greensTotalForRound;
    const greensAverage = allGreensHit / totalPossibleGreens;
    return this.convertAverageToPercent(greensAverage);
  }

  private calculateFairwaysHitAverage(rounds: IRound[], isNineHoleRound: boolean = false): number {
    let fwysTotalForRound: number;
    const allFairwaysHit = rounds.reduce((a, b) => a + b.fairwaysInReg, 0);
    const totalRounds = rounds.length;
    isNineHoleRound ? fwysTotalForRound = 7 : fwysTotalForRound = 14;
    const totalPossibleFairways = totalRounds * fwysTotalForRound; // figure out how to deal with this
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
