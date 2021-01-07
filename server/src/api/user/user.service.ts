import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {UserSignInDto, UserSignUpDto} from "./user.dto";
import User from "../../database/models/user.model";
import {SequelizeProvide} from "../../enum/sequelizeProvide";
import {IUser, IUserCheckValidUserNameResponse, IUserSignInResponse} from "../../interface/user";
import {encryptText, getIsMatchEncryptText} from "../../utils/bcrypt";
import {getUserToken} from "../../utils/jwt";

@Injectable()
export class UserService {
    constructor(
        @Inject(SequelizeProvide.USER) private readonly userModel: typeof User
    ) {}

    async checkValidUserName(username: string): Promise<IUserCheckValidUserNameResponse> {
        const user: User = await this.userModel.findOne({
            where: {
                username
            }
        });
        return {
            isValidUserName: !user
        }
    }

    async signUp(body: UserSignUpDto): Promise<void> {
        const {isValidUserName} = await this.checkValidUserName(body.username);
        if (!isValidUserName) throw new BadRequestException('중복된 아이디가 존재합니다.');

        const encryptPassword: string = await encryptText(body.password);
        await this.userModel.create({
            ...body,
            password: encryptPassword
        });
    }

    async signIn(body: UserSignInDto): Promise<IUserSignInResponse> {
        const user: User = await this.userModel.findOne({
            where: {
                username: body.username
            }
        });

        if (!user) throw new BadRequestException("존재하지 않는 아이디입니다.");

        const isMatchPassword: boolean = await getIsMatchEncryptText(body.password, user.password);
        if (!isMatchPassword) throw new BadRequestException("비밀번호가 일치하지 않습니다.");

        const _user: IUser = {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        const accessToken:string = getUserToken(_user);
        return {
            accessToken,
            user: _user
        };
    }

    async findUserByPk(id: number): Promise<User> {
        return this.userModel.findByPk(id, {
            attributes: {
                exclude: ['password']
            }
        });
    }
}
