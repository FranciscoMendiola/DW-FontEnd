import { Routes } from '@angular/router';

import { CategoryComponent } from './modules/product/component/category/category.component';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { RegisterComponent } from './modules/auth/component/register/register.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';
import { ProductComponent } from './modules/product/component/product/product.component';
import { ProductImageComponent } from './modules/product/component/product-image/product-image.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/category',
        pathMatch: 'full'
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
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'secured',
        component: SecuredComponent,
        canActivate: [authenticationGuard]
    }
];
