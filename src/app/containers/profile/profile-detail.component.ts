import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { User } from '../../models/user';
import { UserService } from '../../services/api/user.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  providers: [UserService],
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit {
    public user: User;

    constructor(
        private _userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            var id = params['id'];

            this._userService.get(id).then(user => {
                this.user = user;

                if (!this.user.hasOwnProperty("friends"))
                    this.user.friends = [];

            });
        });
    }
}