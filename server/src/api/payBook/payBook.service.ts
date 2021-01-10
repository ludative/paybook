import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import PayBook from '../../database/models/payBook.model';
import { SequelizeProvide } from '../../enum/sequelizeProvide';
import { CreatePayBookDto } from './payBook.dto';
import UserPayBook from '../../database/models/userPayBook.model';

@Injectable()
export class PayBookService {
  constructor(
    @Inject(SequelizeProvide.PAY_BOOK) private readonly payBookModel: typeof PayBook,
    @Inject(SequelizeProvide.USER_PAY_BOOK) private readonly  userPayBookModel: typeof UserPayBook,
  ) {
  }

  async getPayBooks(userId: number): Promise<PayBook[]> {
    const userPayBooks: UserPayBook[] = await this.userPayBookModel.findAll({
      where: {
        userId,
      },
      include: [{
        model: PayBook,
        foreignKey: 'payBookId',
      }],
    });
    return userPayBooks.map(userPayBook => userPayBook.payBook);
  }

  async createPayBook(userId: number, body: CreatePayBookDto): Promise<void> {
    const payBook: PayBook = await this.payBookModel.create(body);
    await this.userPayBookModel.create({
      userId,
      payBookId: payBook.id,
    });
  }

  async getPayBook(id: number): Promise<PayBook> {
    const payBook: PayBook = await this.payBookModel.findByPk(id);
    if (!payBook) {
      throw new BadRequestException("존재하지 않는 가계부입니다.")
    }
    return payBook;
  }

  async updatePayBook(id: number, body: CreatePayBookDto): Promise<void> {
    await this.payBookModel.update(body, {
      where: {
        id
      }
    })
  }

  async deletePayBook(id: number): Promise<void> {
    await this.payBookModel.destroy({
      where: {
        id
      }
    })
    await this.userPayBookModel.destroy({
      where: {
        payBookId: id
      }
    })
  }
}
