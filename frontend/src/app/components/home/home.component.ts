import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.userValue;
  }

}
