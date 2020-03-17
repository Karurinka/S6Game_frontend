import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseService} from "./base-service.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../../models/User";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserServices extends BaseService {
  constructor(private httpClient: HttpClient) {
    super();
  }

  json: string;

  getUser(user: User): Observable<User> {
    return this.httpClient.get<User>(`${environment.baseUrl}/user`, this.getDefaultHttpOptions());
  }

}
