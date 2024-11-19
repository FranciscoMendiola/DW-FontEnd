import { Routes } from '@angular/router';

import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { ProductComponent } from './modules/product/component/product/product.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { HomeComponent } from './modules/home/home.component';
import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';
import { CustomerComponent } from './modules/customer/component/customer/customer.component';
import { RegionComponent } from './modules/customer/component/region/region.component';
import { InvoiceComponent } from './modules/invoice/component/invoice/invoice.component';
import { CustomerImageComponent } from './modules/customer/component/customer-image/customer-image.component';
import { ProductByCategoryComponent } from './modules/product/component/product-by-category/product-by-category.component';
import { CartComponent } from './modules/invoice/component/cart/cart.component';
import { BuyComponent } from './modules/invoice/component/buy/buy.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },

    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'category',
        component: CategoryComponent
    },
    {
        path: 'product',
        component: ProductComponent
    },
    {
        path: 'product/:gtin',
        component: ProductImageComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'secured',
        component: SecuredComponent,
        canActivate: [authenticationGuard]
    },

    {
        path: 'invoice',
        component: InvoiceComponent,
    },
    {
        path: 'customer',
        component: CustomerComponent
    },

    {
        path: 'customer/:rfc',
        component: CustomerImageComponent
    },


    {
        path: 'products/:category/:category_id',
        component: ProductByCategoryComponent
    },



    {
        path: 'region',
        component: RegionComponent
    },

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'cart/:buy',
        component: BuyComponent
    },

    {
        path: 'product/:gtin/buy',
        component: BuyComponent
    },
];
