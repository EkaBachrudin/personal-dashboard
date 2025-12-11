import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductStockComponent } from './pages/product-stock/product-stock.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'favorites',
        component: FavoritesComponent
      },
      {
        path: 'inbox',
        component: InboxComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'product-stock',
        component: ProductStockComponent
      }
    ]
  }
];
