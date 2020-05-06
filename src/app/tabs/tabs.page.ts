import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { roundPropertiesAndInputValues } from '../new-round/models/round-type-values';
import { ModalService } from '../services/modal.service';
import { RoundLogicService } from '../services/round-logic.service';
import { UserLogicService } from '../services/user-logic-service';
import { UserService } from '../services/user.service';
import { ICurrentUserResults } from '../user/models/current-user.results.model';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  isCurrentUserLoggedIn: boolean;
  private user: ICurrentUserResults;

  constructor(
    private userService: UserService,
    private userLogicService: UserLogicService,
    private router: Router,
    private roundService: RoundLogicService,
    private modalService: ModalService) {}


  ngOnInit() {
    this.userService.currentUser$.subscribe((user: ICurrentUserResults) => {
      switch (user) {
        case undefined:
        case null:
          this.isCurrentUserLoggedIn = false;
          break;

        default:
          this.user = user;
          this.isCurrentUserLoggedIn = true;
          this.roundService.load(user.user._id);
      }
    });
  }

  public presentNewRoundForm() {
    const roundItems = roundPropertiesAndInputValues();
    this.modalService.presentNewRoundForm(roundItems);
  }

  logoutUser() {
    this.userService.setCurrentUser(undefined);
    this.router.navigateByUrl('/');
    this.userLogicService.showLogoutSuccessToast();
    this.userLogicService.dispatchLogout();
  }
}
