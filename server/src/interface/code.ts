import Code from '../database/models/code.model';

export interface IGetCodesResponse {
  types: Code[]
  payments: Code[]
}
