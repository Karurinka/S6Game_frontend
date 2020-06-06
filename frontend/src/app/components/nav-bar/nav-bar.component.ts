import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/user";
import { AuthenticationService } from "../../services/authentication/authentication.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  user: User;

  constructor(public authenticationService: AuthenticationService) {this.user = authenticationService.userValue }

  ngOnInit(): void {
  }
}
