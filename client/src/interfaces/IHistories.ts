import { ICode } from './ICodes';
import { ClassificationType } from '../enum/histories';

export interface IHistory {
  id: number
  classification: ClassificationType
  title: string
  amount: number
  memo: string
  typeCodeId: number
  typeCode: Omit<ICode, 'createdAt' | 'updatedAt'>,
  paymentCodeId: number
  paymentCode: Omit<ICode, 'createdAt' | 'updatedAt'>,
  date: string
  payBookId: number
}
