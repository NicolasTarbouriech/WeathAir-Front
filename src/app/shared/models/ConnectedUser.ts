import { Township } from "./Township";
import { Role } from "./Role";

export class ConnectedUser{
    id?: number;
    pseudo? : string;
    email: string;
    password?: string;
    role?: Role;
    township? : Township;
  
    constructor(params: any) {
      Object.assign(this, params);
    }
  
    notConnected(): boolean {
      return this.email === undefined;
    }
  }