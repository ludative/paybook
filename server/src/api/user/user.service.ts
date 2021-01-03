import {Inject, Injectable} from '@nestjs/common';
import {UserSignUpDto} from "./user.dto";
import User from "../../database/models/user.model";
import {SequelizeProvide} from "../../enum/sequelizeProvide";

@Injectable()
export class UserService {
    constructor(
        @Inject(SequelizeProvide.USER) private readonly userModel: typeof User
    ) {}

    signUp(body: UserSignUpDto): void {
        console.log(body);
    }
}
