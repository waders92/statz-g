import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

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
  currentCardIndex = 0;
  firstVisibleHole = 0;
  lastVisibleHole = 17;

  @ViewChild('mySlider', { static: true }) slides: IonSlides;


  ngOnInit() {
    this.holes = populateNewHolesForCourse();
  }

  showCard(index: number): boolean {
   return index === this.currentCardIndex ? true : false;
  }

  nextHole(index: number) {
    const newIndex = index + 1;
    if (newIndex > this.lastVisibleHole) {
      return;
    }

    this.currentCardIndex = newIndex;
  }

  prevHole(index: number) {
    const newIndex = index - 1;
    if (newIndex < this.firstVisibleHole) {
      return;
    }

    this.currentCardIndex = newIndex;
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
