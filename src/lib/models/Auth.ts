export interface LoginFormType {
  email: string;
  password: string;
}

export interface RegisterFormType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface CreateUserFormType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: string;
}