import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url1 = environment.apiUrl;

  url = 'http://localhost:8081';

  constructor(private httpClient: HttpClient) { }

  signup(data: any){
    return this.httpClient.post(`${this.url}/user/signup`, data, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      });
  }
}
