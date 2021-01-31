export interface IUser {
  id: number;
  username: string;
  nickname: string;
  isAdmin: boolean;
}

export interface IUserSignInInput {
  username: string;
  password: string;
}
