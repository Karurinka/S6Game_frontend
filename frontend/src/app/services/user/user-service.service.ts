import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "../base-service.service";
import { User } from "../../../models/User";
import { environment } from "../../../environments/environment";

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
