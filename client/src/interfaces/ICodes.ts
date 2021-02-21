import {CodeTypes} from "../enum/codes";

export interface ICode {
    id:	number
    code: string
    name: string
    icon: string
    type: CodeTypes
    createdAt: string
    updatedAt: string
}

export interface IGetCodesApi {
    payments: ICode[];
    types: ICode[]
}

export interface IModalCode {
    id?: number;
    icon: string;
    code: string;
    name: string;
    type: CodeTypes;
}

export interface ICodeApiFormat extends Omit<IModalCode, 'id'> {}
