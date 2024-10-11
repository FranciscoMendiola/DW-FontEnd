import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/component/login/login.component';
import { CategoryComponent } from './modules/product/component/category/category.component';
import { SecuredComponent } from './modules/auth/component/secured/secured.component';
import { authenticationGuard } from './modules/auth/authentication.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/category', pathMatch: 'full' },
    { path: "category", component: CategoryComponent },
    { path: 'login', component: LoginComponent },
    { path: 'secured', component: SecuredComponent, canActivate: [authenticationGuard] }
];
