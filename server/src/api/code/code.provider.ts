import Code from '../../database/models/code.model';
import { SequelizeProvide } from '../../enum/sequelizeProvide';

export const codesProviders = [
  {
    provide: SequelizeProvide.CODE,
    useValue: Code,
  },
];