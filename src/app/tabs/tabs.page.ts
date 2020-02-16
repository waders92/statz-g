import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserLogicService } from '../services/user-logic-service';
import { Router } from '@angular/router';
import { RoundLogicService } from '../services/round-logic.service';
import { ICurrentUserResults } from '../user/models/current-user.results.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  isCurrentUserLoggedIn: boolean;

  constructor(
    private userService: UserService,
    private userLogicService: UserLogicService,
    private router: Router,
    private roundService: RoundLogicService) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe((user: ICurrentUserResults) => {
      switch (user) {
        case undefined:
        case null:
          this.isCurrentUserLoggedIn = false;
          break;

        default:
          this.isCurrentUserLoggedIn = true;
          this.roundService.load(user.user._id);
      }
    });
  }

  logoutUser() {
    this.userService.setCurrentUser(undefined);
    this.router.navigateByUrl('/');
    this.userLogicService.showLogoutSuccessToast();
    this.userLogicService.dispatchLogout();
  }
}
