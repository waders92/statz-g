import { IGolfHole } from './golf-hole';

export function populateNewHolesForCourse(): IGolfHole[] {
  const courseHoles = [];
  for (let i = 1; i <= 18; i++) {
    const currentHole = {} as IGolfHole;
    currentHole.number = i.toString();
    currentHole.par = '';
    currentHole.yardage = '';
    courseHoles.push(currentHole);
  }

  return courseHoles;
}
