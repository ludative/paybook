import { SequelizeProvide } from '../../enum/sequelizeProvide';
import PayBook from '../../database/models/payBook.model';
import UserPayBook from '../../database/models/userPayBook.model';

export const payBooksProviders = [
  {
    provide: SequelizeProvide.PAY_BOOK,
    useValue: PayBook,
  },
  {
    provide: SequelizeProvide.USER_PAY_BOOK,
    useValue: UserPayBook,
  }
];