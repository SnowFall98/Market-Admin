import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { MainPageComponent } from './main-page/main-page.component';
import { Error404Component } from './main-page/error404/error404.component';

import { AuthGuard } from 'src/app/guards/auth.guard';
/*
importamos los módulos de ruta de cada sección del proyecto
Esto con el fin de hacer que el Lazy Loading de Angular sea más eficiente a la hora de cargar cada módulo sin generar
muchos retrasos
Se es más eficiente así y con menor tiempo de carga
*/
const routes: Routes = [
	{ path: 'login',  loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)},
	{ path: '', 
	  component: MainPageComponent, canActivate: [ AuthGuard ],
	  children: [
		{ path: '', loadChildren: () => import('./main-page/home/home.module').then(m=>m.HomeModule)},
		{ path: 'users', loadChildren: () => import('./main-page/users/users.module').then(m=>m.UsersModule)},
		{ path: 'categories', loadChildren: () => import('./main-page/categories/categories.module').then(m=>m.CategoriesModule)},
		{ path: 'subcategories', loadChildren: () => import('./main-page/subcategories/subcategories.module').then(m=>m.SubcategoriesModule)},
		{ path: 'stores', loadChildren: () => import('./main-page/stores/stores.module').then(m=>m.StoresModule)},
	 	{ path: 'products', loadChildren: () => import('./main-page/products/products.module').then(m=>m.ProductsModule)},
		{ path: 'orders', loadChildren: () => import('./main-page/orders/orders.module').then(m=>m.OrdersModule)},
		{ path: 'sales', loadChildren: () => import('./main-page/sales/sales.module').then(m=>m.SalesModule)},
		{ path: 'disputes', loadChildren: () => import('./main-page/disputes/disputes.module').then(m=>m.DisputesModule)},
		{ path: 'messages', loadChildren: () => import('./main-page/messages/messages.module').then(m=>m.MessagesModule)},
		{ path: '**', component: Error404Component}
	  ]
	}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
