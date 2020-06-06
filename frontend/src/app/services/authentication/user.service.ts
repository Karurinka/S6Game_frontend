import { User } from "../../../models/user";
﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import {AuthenticationService} from "./authentication.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }

  json: string;

  getAll() {
    return this.http.get<User[]>(`\`${environment.authUrl}/users`,httpOptions);
  }

  register(user: User) {
    this.json = JSON.stringify(user);
    return this.http.post(`${environment.authUrl}/users/sign-up`, this.json, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${environment.authUrl}/users/${id}`,httpOptions);
  }

  getGuestToken(){
    return this.http.get<any>(`${environment.authUrl}/users/getGuestToken`, httpOptions);
  }
}
