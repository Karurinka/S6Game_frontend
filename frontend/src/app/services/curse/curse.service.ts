import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import {environment} from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class CurseService {

  constructor(private http: HttpClient) { }

  checkCurseWords(message: string){
    return this.http.get<any>(`${environment.lobbyUrl}/curse/` + message);
  }
}
