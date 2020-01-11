import { RoundStatCategories, RoundStatValues } from './round-type-enums';

export function roundPropertiesAndInputValues() {
  return {
    data: [
      RoundStatCategories.Course,
      RoundStatCategories.Score,
      RoundStatCategories.FairwaysInReg,
      RoundStatCategories.GreeensInReg,
      RoundStatCategories.TotalPutts,
      RoundStatCategories.TotalBirdies,
      RoundStatCategories.TotalPars
    ],
    inputValues : [
      RoundStatValues.String,
      RoundStatValues.Number
    ]
  };
}
