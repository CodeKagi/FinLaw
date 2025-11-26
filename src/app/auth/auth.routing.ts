import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@app/auth/login/login.component';
import { AlreadyLoggedCheckGuard } from '@app/auth/guard/authentication.guard';
import { LogoutComponent } from '@app/auth/logout/logout.component';
import { marker } from '@colsen1991/ngx-translate-extract-marker';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [AlreadyLoggedCheckGuard],
    component: LoginComponent,
    data: { title: marker('Login') },
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: marker('Logout') },
  },
    {
    path: 'register',
    component: RegisterComponent ,
    data: { title: marker('register') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthRouting {}
