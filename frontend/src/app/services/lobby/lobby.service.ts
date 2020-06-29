import { Injectable } from '@angular/core';
import { Lobby } from "../../../models/Lobby";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient, private router: Router) {
  }

  createLobby(lobby: Lobby){
    return this.http.post<Lobby>(`${environment.lobbyUrl}/lobby`, lobby, httpOptions);
  }

  getLobby(lobbyName: string){
    return this.http.get<Lobby>(`${environment.lobbyUrl}/lobby/` + lobbyName);
  }

  getLobbyUser(id: number){
    return this.http.post<Lobby>(`${environment.lobbyUrl}/lobby/user`, id, httpOptions);
  }
}
