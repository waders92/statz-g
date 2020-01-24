import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRound } from '../new-round/models/round';

@Injectable({
  providedIn: 'root'
})

export class RoundService {

  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getAllRounds() {
    return this.http.get<IRound[]>(this.baseUrl + 'rounds');
  }

  getRoundById(id: string) {
    return this.http.get<IRound>(this.baseUrl + 'rounds' + '/' + id);
  }

  addRound(round: IRound) {
    return this.http.post(this.baseUrl + 'rounds', round);
  }

  deleteRound(id: string) {
    return this.http.delete(this.baseUrl + 'rounds' + '/' + id);
  }

  updateRround(round: IRound) {
    return this.http.put(this.baseUrl + 'rounds' + '/' + round._id, round);
  }
}
