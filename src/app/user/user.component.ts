import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserLogicService } from '../services/user-logic-service';
import { ICurrentUserResults } from './models/current-user.results.model';
import { UserResponse } from './models/user-reponse-enum';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  email: string;
  password: string;
  loggedInUser: ICurrentUserResults;

  constructor(private service: UserLogicService, private router: Router) { }

  ngOnInit() {
    this.email = 'admin@gmail.com';
    this.password = 'test';
  }

  login() {
    if (this.service.ensureFormHasFields(this.email, this.password)) {
      const user = this.service.getLoginCredentials(this.email, this.password);
      this.service.loginUser(user).subscribe((result: ICurrentUserResults | any) => {
        if (result === UserResponse.NotFound) {
          this.service.showNoUserFoundToast();
          return;
        }

        this.loggedInUser = result;
        this.router.navigateByUrl('/');
        this.service.showLoginSuccessToast(this.loggedInUser);
        this.service.setCurrentUser(this.loggedInUser);
      });
    }
  }
}
