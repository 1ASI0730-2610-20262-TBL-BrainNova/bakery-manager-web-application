import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { LoginPageComponent } from './IAM/interfaces/pages/login-page/login-page.component';
import { SignUpComponent } from './IAM/interfaces/components/sign-up/sign-up.component';
import { authenticationGuard } from './IAM/infrastructure/guards/authentication.guard';

const about = () => import('./shared/presentation/views/about/about').then((m) => m.About);
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);

const baseTitle = 'BakeryManager';

export const routes: Routes = [

  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },

  // Rutas IAM
  { path: 'sign-in', component: LoginPageComponent, title: `${baseTitle} - Sign In` },
  { path: 'sign-up', component: SignUpComponent, title: `${baseTitle} - Sign Up` },

  // Rutas protegidas
  {
    path: 'home',
    component: Home,
    canActivate: [authenticationGuard],
    title: `${baseTitle} - Home`,
  },
  {
    path: 'about',
    loadComponent: about,
    canActivate: [authenticationGuard],
    title: `${baseTitle} - About`,
  },

  // TODO: Add more paths here!

  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` },
];
