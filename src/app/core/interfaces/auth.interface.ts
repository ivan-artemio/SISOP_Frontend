export interface IAuth {
  data: string;
  errors: string;
  message: string;
  success: boolean;
  typeUser: TYPE_USER;
}

export enum TYPE_USER {
  ADMIN = 'admin',
  STUDENT = 'student',
}
