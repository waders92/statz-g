import { ICourse } from "./course";

export interface IRoundBuilder {
  date: Date;
  name: string;
  tees: ICourse[];
}
