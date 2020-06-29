import { Lobby } from "./Lobby";
import { User } from "./User";

export class HelloMessage{
  id: number;
  lobbyId: number;
  lobbyName: string;
  messageOwner: User;
  message: string;
}
