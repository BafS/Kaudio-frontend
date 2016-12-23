import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule, TypeaheadModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Ng2UploaderModule } from 'ng2-uploader/ng2-uploader';
import { MaterialModule } from '@angular/material';
import { Angular2DataTableModule } from 'angular2-data-table';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // Dev tool
import 'hammerjs';
import 'dropzone';

import { KeysPipe } from './pipes/keys'

import { ROUTES } from './app.routes';

import { RestService } from './services/rest.service';
import { SocketService } from './services/socket.service';
// import { PlaylistService } from './services/api/playlist.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './containers/+home/home.component';
import { AboutComponent } from './containers/about/about.component';
import { LoginComponent } from './containers/login/login.component';
import { ProfileComponent } from './containers/profile/profile.component';
import { RegisterComponent } from './containers/register/register.component';
import { PlaylistsComponent } from './containers/playlists/playlists.component';
import { ApiSearchComponent } from './containers/apisearch/apisearch.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AudiobarComponent } from './components/audiobar/audiobar.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SearchresultsComponent } from './components/searchresults/searchresults.component';
import { PlaylistDialogComponent } from './components/playlist-dialog/playlist-dialog.component';
import { LivefeedComponent } from './components/livefeed/livefeed.component';

import { reducers } from './reducers';

@NgModule({
  declarations: [
    KeysPipe,
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
    StoreDevtoolsModule.instrumentOnlyWithExtension(), // Dev tool
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    AlertModule,
    Angular2DataTableModule,
    TypeaheadModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    Ng2UploaderModule
  ],
  providers: [
    SocketService,
    RestService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
