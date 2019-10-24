import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CaddiesComponent} from './caddies/caddies.component';
import {ClientComponent} from './client/client.component';
import {PaymentComponent} from './payment/payment.component';

const routes: Routes = [
    {path:'products/:p1/:p2',component:ProductsComponent},
    {path:'',redirectTo:'products/1/0',pathMatch:'full'},      //redirige vers l'affichage des produits par défaut
    {path:'login',component:LoginComponent},
    {path:'product/details/:url',component:ProductDetailComponent},
    {path:'caddies',component:CaddiesComponent},
    {path:'client', component:ClientComponent},
    {path:'payment/:orderID', component:PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
