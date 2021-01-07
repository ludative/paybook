export interface IUserCheckValidUserNameResponse {
    isValidUserName: boolean;
}

export interface IUser {
    id?: number;
    createdAt?: string;
    updatedAt?: string;
    username: string;
    nickname: string;
    isAdmin: boolean;
}

export interface IUserSignInResponse {
    accessToken: string;
    user: IUser;
}
