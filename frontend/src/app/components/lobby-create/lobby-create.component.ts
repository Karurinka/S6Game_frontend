import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { LobbyService } from "../../services/lobby/lobby.service";
import { Lobby } from "../../../models/Lobby";
import { first } from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-lobby-create',
  templateUrl: './lobby-create.component.html',
  styleUrls: ['./lobby-create.component.scss']
})
export class LobbyCreateComponent implements OnInit {

  lobby: Lobby;
  loading = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              route: ActivatedRoute,
              private lobbyService: LobbyService) {
    this.lobby = new Lobby();
  }

  createLobby() {
    this.loading = true;
    this.lobby.owner = this.authenticationService.userValue;
    const user = this.authenticationService.userValue;
    this.lobbyService.createLobby(this.lobby)
      .pipe(first())
      .subscribe(data => {
        user.lobbyId = data.id;
        user.lobbyName = data.name;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.authenticationService.updateVariables();
        this.router.navigate(['/lobby/' + this.lobby.name])
      })
  }

  ngOnInit(): void {
  }
}
