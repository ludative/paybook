import {Icons} from "../enum/icons";

export interface IGetPayBookApi {
    id: number;
    name: string;
    isShare: boolean;
    inviteCode: string;
    createdAt: string;
    updatedAt: string;
}

export interface IPayBookDropDown {
    key: number;
    value: number;
    text: string;
    icon: Icons
}

export interface ICreatePayBookInfo {
    name: string;
    isShare: boolean;
    inviteCode: string;
}
