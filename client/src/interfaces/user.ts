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

export interface IUserSignUpInput extends IUserSignInInput{
  nickname: string;
}