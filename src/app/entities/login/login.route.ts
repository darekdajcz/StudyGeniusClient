import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login.component';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';

export const loginRoute = [
  {
    path: '',
    component: HomeComponent,
    title: 'Strona główna',
    canLoad: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Logowanie'
  },
  {
    path: 'sign-up',
    component: RegisterComponent,
    title: 'Rejestracja'
  },
  {
    path: 'sign-up-admin',
    component: RegisterAdminComponent,
    title: 'Rejestracja Admina'
  }
];
