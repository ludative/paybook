import Code from '../../database/models/code.model';
import { SequelizeProvide } from '../../enum/sequelizeProvide';
import User from "../../database/models/user.model";

export const codesProviders = [
  {
    provide: SequelizeProvide.CODE,
    useValue: Code,
  },
  {
    provide: SequelizeProvide.USER,
    useValue: User,
  }
];
