import { IRound } from 'src/app/new-round/models/round';

export interface IYearlyRounds {
  year: string;
  rounds: IRound[];
}
