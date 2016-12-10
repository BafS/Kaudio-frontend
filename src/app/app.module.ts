import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { MaterialModule } from '@angular/material';
import { Angular2DataTableModule } from 'angular2-data-table';
import 'hammerjs';

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
import { ApiSearchComponent } from './apisearch/apisearch.component';
import { SearchboxComponent } from './shared/components/searchbox/searchbox.component';
import { SearchresultsComponent } from './shared/components/searchresults/searchresults.component';

import { PlaylistDialogComponent } from './shared/components/playlist-dialog/playlist-dialog.component';
import { LivefeedComponent } from './shared/components/livefeed/livefeed.component';

import { StoreModule } from '@ngrx/store';
import { reducers } from './shared/reducers';

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
    ApiSearchComponent,
    SearchboxComponent,
    SearchresultsComponent,
    PlaylistDialogComponent,
    LivefeedComponent,
  ],
  entryComponents: [
    PlaylistDialogComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore(reducers),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    AlertModule,
    Angular2DataTableModule,
    TypeaheadModule,
    ReactiveFormsModule,
    MaterialModule.forRoot()
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
