export class User {
  constructor(
    // public id: string,
    public email: string,
    public password?: string,
    public picture?: string,
    public friends?: string[]
    // public username?: string
  ) {  }
}

/*
export interface User {
  email: string;
  password?: string;
  picture?: string;
  friends?: string[];
}
*/
