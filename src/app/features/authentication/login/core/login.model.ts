
export class User{
  id?: number;
  pseudo? : string;
  email: string;
  password: string;
  role?: string[];
  township? : string[];

  constructor(params: any) {
    Object.assign(this, params);
  }

  notConnected(): boolean {
    return this.email === undefined;
  }
}