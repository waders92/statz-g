import { IRound } from 'src/app/new-round/models/round';
import { IMonthlyRounds } from './monthly-rounds';

export interface IYearlyRounds {
  year: string;
  months: IMonthlyRounds[];
  rounds: IRound[];
}
