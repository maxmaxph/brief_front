import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConnectPageComponent } from './pages/connect-page/connect-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { AddProductComponent } from './components/add-product/add-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'connect', component: ConnectPageComponent },
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:id',
    component: ProductEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
