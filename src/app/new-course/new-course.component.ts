import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public cancel() {
    this.modalController.dismiss();
  }
}
