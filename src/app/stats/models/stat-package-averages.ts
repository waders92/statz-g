import { ISpecificStatPackage } from './specific-stat-package';

export interface IStatPackageAverages {
  statTitle?: string;
  statType: string;
  isPercentageStat?: boolean;
  statAverage: number;
  detailsPackage: ISpecificStatPackage[];
}
