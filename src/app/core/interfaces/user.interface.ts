import { TYPE_USER } from './auth.interface';

export interface IUser {
  email: string;
  name: string;
  password: string;
  typeUser: TYPE_USER;
  role: number;
  userId: string;
}
