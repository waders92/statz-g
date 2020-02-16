import { Component, OnInit } from '@angular/core';
import { UserLogicService } from '../services/user-logic-service';
import { INewUser } from '../user/models/new-user-model';
import { ICurrentUserResults } from '../user/models/current-user.results.model';
import { UserResponse } from '../user/models/user-reponse-enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {

  constructor(private service: UserLogicService, private router: Router) { }

  email: string;
  password: string;
  firstName: string;
  lastName: string;
  loggedInUser: ICurrentUserResults;

  ngOnInit() {}

  createNewUser() {
   if (this.service.ensureFormHasFields(this.email, this.password)) {
    const newUser: INewUser = this.buildNewUser();
    this.service.createUser(newUser).subscribe((result: ICurrentUserResults | any) => {
      if (this.isUniqueEmailError(result)) {
        this.service.showDuplicateFoundToast(result.errors.email.value);
        return;
      }

      this.loggedInUser = result;
      this.router.navigateByUrl('/');
      this.service.showNewUserSuccessToast(this.loggedInUser);
      this.service.setCurrentUser(this.loggedInUser);
    });
   }
  }

  private isUniqueEmailError(result: any): boolean {
    if (result && result.errors && result.errors.email && result.errors.email.kind === UserResponse.Unique) {
      return true;
    }

    return false;
  }

  private buildNewUser(): INewUser {
    return {
      user: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }
    };
  }
}
