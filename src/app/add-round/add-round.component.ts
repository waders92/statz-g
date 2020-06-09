import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";

import { HttpClient } from "@angular/common/http";
import { IRoundBuilder } from "./models/round-builder";

@Component({
  selector: "app-add-round",
  templateUrl: "./add-round.component.html",
  styleUrls: ["./add-round.component.scss"],
})
export class AddRoundComponent implements OnInit {
  public date;
  public courses = [];
  public filteredCourses = [];
  public noResults: boolean;

  constructor(
    private modalController: ModalController,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.courses = [{ name: "Grant Park" }, { name: "Whitnall Park" }];
  }

  onCourseSearch(event: any) {
    const searchParams = event.detail.value.toLowerCase();
    this.filteredCourses = this.courses.filter((x) =>
      x.name.toLowerCase().includes(searchParams)
    );
    this.noResults = this.filteredCourses.length === 0;

    if (!searchParams.length) {
      this.filteredCourses = [];
    }
  }

  courseSelected(course: any) {
    const splittedCourseString = course.name.toLowerCase().split(/\s(.+)/)[0];
    this.http
      .get(`../assets/courses/${splittedCourseString}.json`)
      .subscribe((selectedCourse: IRoundBuilder) => {
        selectedCourse.date = this.date;
        console.log(selectedCourse);
      });
  }

  public cancel() {
    this.modalController.dismiss();
    this.router.navigateByUrl("/");
  }
}
