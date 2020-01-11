export interface IRound {
  id: number;
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
