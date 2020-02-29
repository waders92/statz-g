import { Injectable } from '@angular/core';
import { IRound } from '../models/round';

@Injectable()
export class NewRoundConverter {

  public convertRoundFromJson(data: any): IRound {
   let roundData = data.data.data;
   roundData = this.buildRoundDictionary(roundData);
   return this.create(roundData);
  }

  private buildRoundDictionary(data: any): IStatsDict {
    const statsDict = {} as IStatsDict;
    const categories = Object.keys(data);
    const values = Object.values(data);

    for (let i = 0; i <= categories.length - 1; i++) {
      const obj = categories[i];
      const converted = obj.split(' ').join('_').toLowerCase();
      statsDict[converted] = values[i];
    }

    return statsDict;
  }

  private create(roundData: IStatsDict): IRound {
    return {
      _id: roundData.id,
      userId: roundData.userId,
      course: roundData.course,
      score: roundData.score,
      fairwaysInReg: roundData.fairways_in_regulation,
      greensInReg: roundData.greens_in_regulation,
      totalPutts: roundData.total_putts,
      totalBirdies: roundData.total_birdies,
      totalPars: roundData.total_pars,
      date: roundData.date,
      nineHoleRound: roundData.nine_hole_round
    };
  }
}

export interface IStatsDict {
  id: string;
  userId: string;
  course: string;
  score: number;
  fairways_in_regulation: number;
  greens_in_regulation: number;
  total_putts: number;
  total_birdies: number;
  total_pars: number;
  date: Date;
  nine_hole_round: boolean;
}
