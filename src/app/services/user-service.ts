import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private createUserUrl = 'http://localhost:3000/users';
  private loginUserUrl = 'http://localhost:3000/users/login';

  constructor(private http: HttpClient) { }
}

