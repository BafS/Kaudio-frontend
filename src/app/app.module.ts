import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Angular2DataTableModule } from 'angular2-data-table';

import { ROUTES } from './app.routes';

import { RestService } from './shared/services/rest.service';
import { SocketService } from './shared/services/socket.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './+home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { RegisterComponent } from './register/register.component';
import { PlaylistComponent } from './shared/components/playlist/playlist.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { AudiobarComponent } from './shared/components/audiobar/audiobar.component';
import { ApiSearchComponent } from './shared/components/apisearch/apisearch.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    RegisterComponent,
    ProfileComponent,
    PlaylistComponent,
    SidebarComponent,
    PlaylistsComponent,
    AudiobarComponent,
    ApiSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    AlertModule,
    Angular2DataTableModule
  ],
  // providers: [],
  providers: [ SocketService, RestService ],
  bootstrap: [AppComponent, [
    // RestService,
    // SocketService,
    // MessageService
  ]]
})
export class AppModule {
}
