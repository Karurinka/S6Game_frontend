import { User } from "./User";

export class Lobby{

  id: number;
  name: string;
  owner: User;
  participants: User[];
}
