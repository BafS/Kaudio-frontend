import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { md5 } from './md5';

import { User } from '../../models/user';
import { UserService } from '../../services/api/user.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  providers: [UserService],
  styleUrls: ['./profile-detail.component.scss'],
})
export class ProfileDetailComponent implements OnInit {
    public user: User;
    public createdAt: string;
    public gravatar: string;

    constructor(
        private _userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];

            this._userService.get(id).then(user => {
                this.user = user;
                this.createdAt = user.createdAt.substr(0, 10);
                this.gravatar = md5(this.user.email);

                if (!this.user.hasOwnProperty('friends')) {
                    this.user.friends = [];
                }
            });
        });
    }
}
