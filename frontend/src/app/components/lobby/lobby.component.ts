import { Component, OnInit } from '@angular/core';
import { WebSocketAPI } from "./WebSocketAPI";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  constructor() { }

  webSocketAPI: WebSocketAPI;
  greeting: any;
  name: string;
  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(new LobbyComponent());
  }

  connect(){
    this.webSocketAPI._connect();
  }

  disconnect(){
    this.webSocketAPI._disconnect();
  }

  sendMessage(){
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message){
    this.greeting = message;
  }
}
