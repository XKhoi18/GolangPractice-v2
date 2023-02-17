import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Added
import { ProductComponent } from "./product/product.component";
import { HomepageComponent } from './homepage/homepage.component';
import { CartComponent } from './cart/cart.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginpageComponent },
  { path: 'single-product', component: SingleProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
