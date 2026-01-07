import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
  },

  {
    path: 'create-order',
    loadComponent: () =>
      import('./pages/create-order/create-order.page').then(m => m.CreateOrderPage)
  },

  {
    path: 'orders',
    loadComponent: () =>
      import('./pages/orders/orders.page').then(m => m.OrdersPage)
  },

  {
    path: 'manifest/:id',
    loadComponent: () =>
      import('./pages/manifest/manifest.page').then(m => m.ManifestPage)
  },

  {
    path: 'staff-activity',
    loadComponent: () =>
      import('./pages/staff-activity/staff-activity.page').then(m => m.StaffActivityPage)
  }
];
