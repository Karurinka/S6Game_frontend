import {Component, OnInit} from '@angular/core';
import {WebSocketAPI} from "./WebSocketAPI";
import {Lobby} from "../../../models/Lobby";
import {LobbyService} from "../../services/lobby/lobby.service";
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {FormBuilder} from "@angular/forms";
import {HelloMessage} from "../../../models/HelloMessage";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  webSocketAPI: WebSocketAPI;
  chatForm;
  lobby: Lobby
  loading = false;
  findingLobby: Lobby;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private lobbyService: LobbyService) {
    this.chatForm = this.formBuilder.group({message: ''})
    this.lobby = new Lobby();
    this.findingLobby = new Lobby();
  }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let lobbyName = params.get('lobbyName');
      this.lobby.name = lobbyName;
    });
    this.webSocketAPI = new WebSocketAPI(this, this.authenticationService);
    this.connect();
    this.loading = true;
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage(message) {
    const helloMessage = new HelloMessage();
    helloMessage.message = message;
    const user = this.authenticationService.userValue;
    helloMessage.messageOwner = user;
    this.webSocketAPI._send(helloMessage);
  }

  findLobby() {
    console.log(this.findingLobby);
    this.router.navigate(['/lobby/' + this.findingLobby.name]);
    this.ngOnInit();
  }
}
