import * as jwt from 'jsonwebtoken'
import User from "../database/models/user.model";
import * as dotenv from 'dotenv';

dotenv.config();

export const getUserToken = (user: Partial<User>): string => {
    return jwt.sign(user, process.env.JWT_KEY);
};

export const verifyToken = (token: string) => {
    const data: any = jwt.verify(token, process.env.JWT_KEY);
    return data;
};
