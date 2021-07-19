export type LoginCredentials = {
  username: string;
  password: string;
}

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export type LoginRequest = {
  access_token: string;
}
