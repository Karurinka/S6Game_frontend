import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { LobbyService } from "../../services/lobby/lobby.service";
import { Lobby } from "../../../models/Lobby";

@Component({
  selector: 'app-lobby-create',
  templateUrl: './lobby-create.component.html',
  styleUrls: ['./lobby-create.component.scss']
})
export class LobbyCreateComponent implements OnInit {

  lobby: Lobby;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              route: ActivatedRoute,
              private lobbyService: LobbyService) {
    this.lobby = new Lobby();
  }

  createLobby(){
    console.log(this.lobby.name);
    this.lobbyService.createLobby(this.lobby);
    this.router.navigate(['/lobby/' + this.lobby.name])
  }

  ngOnInit(): void {

  }
}
