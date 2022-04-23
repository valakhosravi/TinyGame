import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WarriorService {
  public http: HttpClient;

  constructor(
    private httpClient: HttpClient
  ) {
    this.http = this.httpClient;
  }

  public getWarriors() {
    return this.http.get('/api/warrior');
  }
}
