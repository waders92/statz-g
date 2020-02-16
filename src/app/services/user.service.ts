import { Injectable } from '@angular/core';
import { ICurrentUserResults } from '../user/models/current-user.results.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // tslint:disable-next-line: variable-name
  private _user = new BehaviorSubject<ICurrentUserResults>(null);

  currentUser$ = this._user.asObservable();

  setCurrentUser(user: ICurrentUserResults): void {
    this._user.next(user);
  }
}
