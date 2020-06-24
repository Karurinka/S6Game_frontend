import { User } from "../../../models/user";
﻿import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private router: Router,
              private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get userValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return this.http.post<any>(`${environment.authUrl}/users/login`, { username, password}, httpOptions)
      .pipe(map(receivedUser => {
        console.log(receivedUser);
        localStorage.setItem('currentUser', JSON.stringify(receivedUser));
        this.currentUserSubject.next(receivedUser);
        return receivedUser;
      }));
  }

  update(user: User) {
    return this.http.post<User>(`${environment.authUrl}/user/update`, user, httpOptions)
      .pipe(map(receivedUser => {
        console.log('updated user =' + receivedUser);
        localStorage.setItem('currentUser', JSON.stringify(receivedUser));
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        return receivedUser;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/account/login']);
  }
}
