export class User {
  constructor(
    public email: string,
    public password?: string,
    public picture?: string,
    public friends?: string[],
    public friends_ref?: string[]
  ) {  }
}
