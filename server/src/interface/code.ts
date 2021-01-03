export interface ICode {
  id?: number
  code: string
  createdAt?: string
  updatedAt?: string
  name: string
  icon: string
  type: 'TYPE' | 'PAYMENT'
}

export interface IGetCodesResponse {
  types: ICode[]
  payments: ICode[]
}