import User from "../../database/models/user.model";
import {SequelizeProvide} from "../../enum/sequelizeProvide";

export const usersProviders = [
    {
        provide: SequelizeProvide.USER,
        useValue: User,
    }
];
