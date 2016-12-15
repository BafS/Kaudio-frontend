import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../services/api/authentication.service';
// import { PlaylistComponent } from './../shared/components/playlist/playlist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  // directives: [ PlaylistComponent ],
  providers: [ AuthenticationService ]
})
export class HomeComponent implements OnInit {

  token = this._authService.getToken()

  constructor(
    private _authService: AuthenticationService
    // private router: Router
  ) {
  }

  ngOnInit() {
  }

}
