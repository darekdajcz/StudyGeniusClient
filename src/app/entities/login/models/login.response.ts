import { User } from './user';

export interface LoginResponse {
  nonce?: string;
  success?: boolean,
  token?: string,
  user_data?: User
}
