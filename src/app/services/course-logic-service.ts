import { Injectable } from '@angular/core';

import { ICourse } from '../new-course/models/course';
import { CourseDataService } from './course-data-service';

@Injectable({
  providedIn: 'root'
})

export class CourseLogicService {

  constructor(private courseDataService: CourseDataService) { }

    public addCourse(course: ICourse) {
      return this.courseDataService.addCourse(course);
    }
}
