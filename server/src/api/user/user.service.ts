import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {UserSignUpDto} from "./user.dto";
import User from "../../database/models/user.model";
import {SequelizeProvide} from "../../enum/sequelizeProvide";
import {IUserCheckValidUserNameResponse} from "../../interface/user";

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
            isValidUserName: !!user
        }
    }

    async signUp(body: UserSignUpDto): Promise<void> {
        throw new BadRequestException('ERROR!!')
        const isDuplicatedUserName = await this.userModel.findOne({
            where: {
                username: body.username
            }
        });
        console.log(isDuplicatedUserName);
        console.log(body);
    }
}
