export class User {
  constructor(
    public email: string,
    public password?: string,
    public alias?: string,
    public date_birth?: string,
    public country?: string,
    public picture?: string,
    public friends?: string[],
    public friends_ref?: string[]
  ) {  }
}
