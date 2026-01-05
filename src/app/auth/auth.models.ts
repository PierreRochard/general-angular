export interface PostLoginRequestPayload {
  formName: string;
  schemaName: string;
  data: LoginData;
}

export interface LoginData {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}
