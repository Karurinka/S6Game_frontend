import {Component, OnInit} from '@angular/core';
import {WebSocketAPI} from "./WebSocketAPI";
import {Lobby} from "../../../models/Lobby";
import {LobbyService} from "../../services/lobby/lobby.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {FormBuilder} from "@angular/forms";
import {HelloMessage} from "../../../models/HelloMessage";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  webSocketAPI: WebSocketAPI;
  name: string;
  chatForm;
  lobby: Lobby
  loading = false;
  lobbyForm;

  private route: ActivatedRoute;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              route: ActivatedRoute,
              private lobbyService: LobbyService) {
    this.lobbyForm = this.formBuilder.group({findingLobby: ''}),
      this.chatForm = this.formBuilder.group({message: ''})
  }


  ngOnInit() {
    let test: Lobby = new Lobby();
    test.name = "test";
    this.lobbyService.createLobby(test);

    this.route.paramMap.subscribe(data => {
      this.lobbyService.getLobby(data.get('lobbyName'))
        .pipe(first())
        .subscribe(lobbyData => {
          this.lobby = lobbyData;
        })
    })
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

  findLobby(findingLobby){
    this.router.navigate(['/lobby/' + findingLobby.findingLobby])
    this.ngOnInit();
  }
}
