import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import PayBook from '../../database/models/payBook.model';
import { SequelizeProvide } from '../../enum/sequelizeProvide';
import { CreatePayBookByInviteCodeDto, CreatePayBookDto } from './payBook.dto';
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
        as: 'payBook',
        foreignKey: 'payBookId',
      }],
      order: [[{ model: PayBook, as: 'payBook' }, 'name', 'ASC']],
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
      throw new BadRequestException('존재하지 않는 가계부입니다.');
    }
    return payBook;
  }

  async updatePayBook(id: number, body: CreatePayBookDto): Promise<void> {
    await this.payBookModel.update(body, {
      where: {
        id,
      },
    });
  }

  async deletePayBook(id: number): Promise<void> {
    await this.payBookModel.destroy({
      where: {
        id,
      },
    });
    await this.userPayBookModel.destroy({
      where: {
        payBookId: id,
      },
    });
  }

  async createPayBookByInviteCode(userId: number, body: CreatePayBookByInviteCodeDto): Promise<void> {
    const payBook: PayBook = await this.payBookModel.findOne({
      where: {
        inviteCode: body.inviteCode,
      },
    });
    if (!payBook) {
      throw new BadRequestException('잘못된 초대 코드 입니다.');
    }

    const userPayBook: UserPayBook = await this.userPayBookModel.findOne({
      where: {
        userId,
        payBookId: payBook.id,
      },
    });
    if (userPayBook) {
      throw new BadRequestException('이미 초대가 완료된 가계부 입니다.');
    }

    await this.userPayBookModel.create({
      userId,
      payBookId: payBook.id,
    });
  }
}
