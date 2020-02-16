import { Component, OnInit } from '@angular/core';
import { roundPropertiesAndInputValues } from './models/round-type-values';
import { ModalService } from '../services/modal.service';
import { ICurrentUserResults } from '../user/models/current-user.results.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-round',
  templateUrl: 'new-round.component.html',
  styleUrls: ['new-round.component.scss']
})
export class NewRoundComponent implements OnInit {

  public roundItems: any;
  public user: ICurrentUserResults;

  constructor(private modalService: ModalService, private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser$.subscribe((user: ICurrentUserResults) => {
      this.user = user;
    });

    this.roundItems = roundPropertiesAndInputValues();
  }

  public presentNewRoundForm() {
    this.modalService.presentNewRoundForm(this.roundItems, this.user.user._id);
  }
}
