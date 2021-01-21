

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserInfo {
  email: string;
  firstname: string;
  lastname: string;
  user_role: UserRole;
}

export interface UserRole {
  id: number;
  label: string;
  name: string;
}

export interface AuthToken {
  token_type: string;
  access_token: string;
  expires_in: number;
}


