import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { User } from '../../models/user';
import { UserService } from '../../services/api/user.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile.component.html',
})
export class ProfileDetailComponent implements OnInit {
    @Input()
    user: User;

    constructor(
        private _userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
    /*this.route.params
        .switchMap((params: Params) => this._userService.get(+params['id']))
        .subscribe(user => this.user = user);*/
    }
}