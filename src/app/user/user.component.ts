import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  emailAddress: string;
  password: string;

  constructor() { }

  ngOnInit() {}

  login() {
    console.log(5);
  }
}
