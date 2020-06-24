import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { LobbyComponent } from "./lobby.component"
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {environment} from "../../../environments/environment";
import {HelloMessage} from "../../../models/HelloMessage";

export class WebSocketAPI{
  webSocketEndPoint = `${environment.lobbyUrl}/ws?access_token=` + this.authenticationService.userValue.access_token;
  topic = '/topic/greetings/';
  stompClient: any;
  public messages: HelloMessage[] = [];
  lobbyComponent: LobbyComponent;
  constructor(appComponent: LobbyComponent,
              private authenticationService: AuthenticationService){
    this.lobbyComponent = appComponent;
  }

  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    // tslint:disable-next-line:only-arrow-functions
    _this.stompClient.connect({}, function(frame) {
      // tslint:disable-next-line:only-arrow-functions
      _this.stompClient.subscribe(_this.topic + _this.authenticationService.userValue.lobbyName, (message) => {
        if (message.body) {
          console.log(message.body);
          _this.messages.push(message.body);
        }
      });
      // _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message: HelloMessage) {
    this.stompClient.send('/app/hello/' + this.authenticationService.userValue.lobbyName, {}, JSON.stringify(message));
  }
}

