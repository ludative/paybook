export interface IUserCheckValidUserNameResponse {
    isValidUserName: boolean;
}

export interface IUser {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    nickname: string;
    isAdmin: boolean;
}

export interface IUserSignInResponse {
    accessToken: string;
    user: IUser;
}
