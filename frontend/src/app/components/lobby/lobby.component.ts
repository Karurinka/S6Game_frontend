import {Component, OnInit} from '@angular/core';
import {WebSocketAPI} from "./WebSocketAPI";
import {Lobby} from "../../../models/Lobby";
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {FormBuilder} from "@angular/forms";
import {HelloMessage} from "../../../models/HelloMessage";
import {CurseService} from "../../services/curse/curse.service";
import {LobbyService} from "../../services/lobby/lobby.service";
import {HttpClient} from "@angular/common/http";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  webSocketAPI: WebSocketAPI;
  lobby: Lobby
  loading = false;
  findingLobby: Lobby;
  message: string;
  cleanMessages: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private activatedRoute: ActivatedRoute,
              private lobbyService: LobbyService,
              private curseService: CurseService) {
    this.lobby = new Lobby();
    this.findingLobby = new Lobby();
  }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let lobbyName = params.get('lobbyName');
      this.lobby.name = lobbyName;
    });
    this.getLobby();
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

  sendMessage() {
    const helloMessage = new HelloMessage();
    helloMessage.message = this.message;
    helloMessage.lobbyId = this.lobby.id;
    const user = this.authenticationService.userValue;
    helloMessage.messageOwner = user;
    helloMessage.lobbyName = this.lobby.name;
    this.checkCurseWords(helloMessage.message);
    console.log(helloMessage.message);
    this.webSocketAPI._send(helloMessage);
  }

  findLobby() {
    console.log(this.findingLobby);
    this.router.navigate(['/lobby/' + this.findingLobby.name]);
    this.ngOnInit();
  }

  checkCurseWords(cleanMessage: string): string {
      let checkedMessage = cleanMessage;
      this.curseService.checkCurseWords(checkedMessage)
        .pipe(first())
        .subscribe(data => {
        checkedMessage = data;
      })
      return cleanMessage;
  }

  getLobby(){
    this.lobbyService.getLobby(this.lobby.name).subscribe( data =>{
      this.lobby = data;
    })
  }
}
