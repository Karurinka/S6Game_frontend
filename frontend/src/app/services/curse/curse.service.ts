import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurseService {

  constructor(private http: HttpClient) { }

  checkCurseWords(message: string){
    return this.http.get<string>(`${environment.lobbyUrl}/curse/` + message);
  }
}
