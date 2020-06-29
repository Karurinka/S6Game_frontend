import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { LobbyComponent } from "./lobby.component"
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { environment } from "../../../environments/environment";
import { HelloMessage } from "../../../models/HelloMessage";

export class WebSocketAPI{
  webSocketEndPoint = `${environment.lobbyUrl}/ws?access_token=` + this.authenticationService.userValue.access_token;
  topic = '/topic/greetings/';
  stompClient: any;
  public messages: HelloMessage[] = [];
  public justMessages: string[] = [];
  lobbyComponent: LobbyComponent;
  constructor(appComponent: LobbyComponent,
              private authenticationService: AuthenticationService){
    this.lobbyComponent = appComponent;
  }

  _connect() {
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function(frame) {
      _this.stompClient.subscribe(_this.topic + _this.authenticationService.userValue.lobbyName, (message) => {
        if (message.body) {
          _this.messages.push(message.body);
        }
      });
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  errorCallBack(error) {
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _send(message: HelloMessage) {
    this.stompClient.send('/app/hello/' + this.authenticationService.userValue.lobbyName, {}, JSON.stringify(message));
  }
}

