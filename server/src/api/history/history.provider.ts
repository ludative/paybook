import {SequelizeProvide} from '../../enum/sequelizeProvide';
import History from "../../database/models/history.model";
import Code from "../../database/models/code.model";
import PayBook from "../../database/models/payBook.model";
import UserPayBook from "../../database/models/userPayBook.model";

export const historyProviders = [
  {
    provide: SequelizeProvide.HISTORY,
    useValue: History,
  },
  {
    provide: SequelizeProvide.CODE,
    useValue: Code,
  },
  {
    provide: SequelizeProvide.PAY_BOOK,
    useValue: PayBook
  },
  {
    provide: SequelizeProvide.USER_PAY_BOOK,
    useValue: UserPayBook
  }
];
