import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FlowersListComponent } from './components/flowers-list/flowers-list.component';
import { FlowerCategoryMenuComponent } from './components/flower-category-menu/flower-category-menu.component';
import { FlowerDetailsComponent } from './components/flower-details/flower-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'about', component: AboutusComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'home', component: HomeComponent },
  { path: 'flowers', component: FlowersListComponent },
  { path: 'category', component: FlowerCategoryMenuComponent },
  { path: 'category/:id', component: FlowersListComponent },
  { path: 'search/:keyword', component: FlowersListComponent },
  { path: 'flowers/:id', component: FlowerDetailsComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'wish-list', component: WishListComponent, canActivate: [AuthGuard] },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
