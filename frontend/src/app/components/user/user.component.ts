import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../../../models/User";
import {UserServices} from "../../services/user/user-service.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username = null;
  error = ' ';
  user: User;

  constructor(private userService: UserServices, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser(this.user).subscribe(
      data => {
        if (data != null) {
          this.user = data;
        }
      }, error => {
        this.error = error;
      });
  }
}
