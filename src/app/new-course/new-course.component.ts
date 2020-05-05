import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ICourse } from './models/course';
import { IGolfHole } from './models/golf-hole';
import { populateNewHolesForCourse } from './models/populate-holes';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  holes = [] as IGolfHole[];
  newCoursePackage = {} as ICourse;
  courseName: string;
  state: string;
  slideOpts = {
    scrollbar: true
  };


  ngOnInit() {
    this.holes = populateNewHolesForCourse();
  }

  public cancel() {
    this.modalController.dismiss();
  }

  public submit() {
    const dataIsVerified = this.verifyData();

    if (dataIsVerified) {
      this.newCoursePackage = {
        courseName: this.courseName,
        state: this.state,
        holes: this.holes
      } as ICourse;

      // send package to service to save
    } else {
      alert('Fill in all fields!');
    }
  }

  public move(slide: any) {
    console.log(slide);
  }

  private verifyData(): boolean {
    let isVerified = true;

    if (this.courseName === undefined || this.state === undefined || this.holeDataMissing()) {
      isVerified = false;
    }

    return isVerified;
  }

  private holeDataMissing(): boolean {
    return this.holes.some(hole => hole.par === '' || hole.yardage === '');
  }
}
