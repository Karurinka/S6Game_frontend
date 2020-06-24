import { Lobby } from "./Lobby";
import { User } from "./User";

export class HelloMessage{
  id: number;
  lobbyId: Lobby;
  messageOwner: User;
  message: string;
}
