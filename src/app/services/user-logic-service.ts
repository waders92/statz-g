import { Injectable } from '@angular/core';
import { UserDataService } from './user-data-service';
import { IUser } from '../user/models/user-model';
import { ToastController } from '@ionic/angular';
import { UserResponse } from '../user/models/user-reponse-enum';
import { INewUser } from '../user/models/new-user-model';
import { Observable } from 'rxjs';
import { ICurrentUserResults } from '../user/models/current-user.results.model';
import { UserService } from './user.service';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { Logout } from '../actions/round.actions';

@Injectable({
  providedIn: 'root'
})

export class UserLogicService {
  constructor(
    private userDataService: UserDataService,
    private toastCtrl: ToastController,
    private userService: UserService,
    private store: Store<AppState>) {}

  loginUser(user: IUser): Observable<ICurrentUserResults> {
    return this.userDataService.loginUser(user);
  }

  createUser(user: INewUser): Observable<ICurrentUserResults> {
    return this.userDataService.createUser(user);
  }

  ensureFormHasFields(email: string, password: string): boolean {
    if (!email || !password) {
      alert('Please fill in all fields!');
      return false;
    }

    return true;
  }

 getLoginCredentials(currentEmail: string, currentPassword: string): IUser {
    return {
      user: {
        email: currentEmail,
        password: currentPassword
      }
    };
  }

  setCurrentUser(user: ICurrentUserResults) {
    this.userService.setCurrentUser(user);
  }

  dispatchLogout() {
    this.store.dispatch(new Logout());
  }

  async showNoUserFoundToast(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: UserResponse.NotFound,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async showDuplicateFoundToast(email: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Another user with ' + email + ' has already been created. Please pick an new email address.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async showNewUserSuccessToast(newUser: ICurrentUserResults): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'A new user has been created with ' + newUser.user.email + '!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async showLoginSuccessToast(newUser: ICurrentUserResults): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'Welcome back ' + newUser.user.firstName + '' + newUser.user.lastName + '!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async showLogoutSuccessToast(): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: 'You have been logged out.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
