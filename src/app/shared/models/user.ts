export class User {
  constructor(
    // public id: string,
    public email: string,
    public password?: string,
    public picture?: string,
    public friends_refs?: string[]
    // public username?: string
  ) {  }
}


/*export interface User {
  id?: string;
  email: string;
  password?: string;
  picture?: string;
  friends_ref?: string[];
}*/
