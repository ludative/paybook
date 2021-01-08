import { SequelizeProvide } from '../../enum/sequelizeProvide';
import History from "../../database/models/history.model";
import Code from "../../database/models/code.model";

export const historyProviders = [
  {
    provide: SequelizeProvide.HISTORY,
    useValue: History,
  },
  {
    provide: SequelizeProvide.CODE,
    useValue: Code,
  },
];
