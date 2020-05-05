import { IGolfHole } from './golf-hole';

export interface ICourse {
  courseName: string;
  state: string;
  holes: IGolfHole[];
}
