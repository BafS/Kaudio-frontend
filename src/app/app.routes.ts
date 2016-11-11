import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './+home/home.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
// import { PageNotFoundComponent } from './page-not-found-component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'playlists', component: PlaylistsComponent },
  //{ path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  // { path: '**', component: PageNotFoundComponent }
];
