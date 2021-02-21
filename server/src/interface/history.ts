import {CodeType} from "../enum/code";

export interface ICheckIsValidCodeIdArgs {
    id: number;
    type: CodeType;
    errorMessage: string;
}
