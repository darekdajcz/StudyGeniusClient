import { AuthRole } from './auth-role';

export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: AuthRole;
}