import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICourse } from '../new-course/models/course';

@Injectable({
  providedIn: 'root'
})

export class CourseDataService {
  private baseUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) { }

  addCourse(course: ICourse) {
    return this.http.post(this.baseUrl, course);
  }
}
