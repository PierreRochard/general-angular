export interface SendLoginPostRequestPayload {
  path: string;
  data: LoginData;
}

export interface LoginData {
  email: string;
  password: string;
}
