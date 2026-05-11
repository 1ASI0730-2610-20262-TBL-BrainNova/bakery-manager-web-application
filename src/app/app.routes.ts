import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';
import { InventoryManagement } from './inventory/presentation/views/./inventory-management/inventory-management';
const about = () => import('./shared/presentation/views/about/about').then((m) => m.About);
const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then((m) => m.PageNotFound);

const baseTitle = 'BakeryManager';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
    title: `${baseTitle} - Home`,
  },
  {
    path: 'about',
    loadComponent: about,
    title: `${baseTitle} - About`,
  },
  {
    path: 'inventory',
    component: InventoryManagement,
    title: `${baseTitle} - Inventory Management`,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: pageNotFound,
    title: `${baseTitle} - Page Not Found`,
  },
];
