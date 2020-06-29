import { User } from "../../../models/user";
﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable } from "rxjs";
import { AuthenticationService } from "../authentication/authentication.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  json: string;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) { }

  getAll() {
    return this.http.get<User[]>(`${environment.authUrl}/users`,httpOptions);
  }

  register(user: User) {
    return this.http.post(`${environment.authUrl}/users/sign-up`, user, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(`${environment.authUrl}/users/${id}`, httpOptions);
  }
}
