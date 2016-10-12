import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './+home/home.component';
import { AboutComponent } from './about/about.component';
// import { PageNotFoundComponent } from './page-not-found-component';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'test', loadChildren: () => System.import('./+detail') },
  // { path: '**', component: PageNotFoundComponent }
];
