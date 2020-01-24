export interface IRound {
  _id: string;
  userId: string;
  course: string;
  score: number;
  fairwaysInReg: number;
  greensInReg: number;
  totalPutts: number;
  totalBirdies: number;
  totalPars: number;
  date: Date;
}
