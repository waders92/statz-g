import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRound } from '../new-round/models/round';

@Injectable({
  providedIn: 'root'
})

export class RoundService {

  constructor(private http: HttpClient) { }

  public getRounds(): Observable<any> {
    return this.http.get('http://localhost:3000/rounds');
  }
}
