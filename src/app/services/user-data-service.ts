import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../user/models/user-model';
import { INewUser } from '../user/models/new-user-model';
import { Observable } from 'rxjs';
import { ICurrentUserResults } from '../user/models/current-user.results.model';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  private createUserUrl = 'http://localhost:3000/users';
  private loginUserUrl = 'http://localhost:3000/users/login';

  constructor(private http: HttpClient) { }

  loginUser(user: IUser): Observable<ICurrentUserResults> {
    return this.http.post<ICurrentUserResults>(this.loginUserUrl, user);
  }

  createUser(newUser: INewUser): Observable<ICurrentUserResults> {
    return this.http.post<ICurrentUserResults>(this.createUserUrl, newUser);
  }
}

