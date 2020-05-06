import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-add-round',
  templateUrl: './add-round.component.html',
  styleUrls: ['./add-round.component.scss'],
})
export class AddRoundComponent implements OnInit {

  public date;
  public courses = [];
  public filteredCourses = [];
  public noResults: boolean;

  constructor(private modalController: ModalController, private modalService: ModalService, private router: Router) { }

  ngOnInit() {
    // get list of courses store or service call
    this.courses = [
      { name: 'Grant Park' },
      { name: 'Greenfield Park' },
      { name: 'Whitnall Park' },
      { name: 'Dretzka Park' }
    ];
  }

  onCourseSearch(event: any) {
    const searchParams = event.detail.value.toLowerCase();
    this.filteredCourses = this.courses.filter(x => x.name.toLowerCase().includes(searchParams));
    this.noResults = this.filteredCourses.length === 0;

    if (!searchParams.length) {
      this.filteredCourses = [];
    }
  }

  courseSelected(course: any) {
    console.log(course);
    // navigate to course input component, pass course
  }

  addNewCourse(): void {
    this.modalService.presentNewCourseForm();
  }

  public cancel() {
    this.modalController.dismiss();
    this.router.navigateByUrl('/');
  }
}
