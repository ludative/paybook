import {CodeType} from "../enum/code";

export interface ICode {
  id?: number
  code: string
  createdAt?: string
  updatedAt?: string
  name: string
  icon: string
  type: CodeType
}

export interface IGetCodesResponse {
  types: ICode[]
  payments: ICode[]
}
