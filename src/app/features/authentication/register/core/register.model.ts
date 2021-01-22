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
  
  export interface RegisterToken {
    token_type: string;
    access_token: string;
    expires_in: number;
  }
  