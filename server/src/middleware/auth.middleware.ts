import {
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NestMiddleware, UnauthorizedException
} from "@nestjs/common";
import {CookieNames} from "../enum/auth";
import {verifyToken} from "../utils/jwt";
import {IUser} from "../interface/user";
import {UserService} from "../api/user/user.service";

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService
    ) {
    }
    async use(req, res, next: () => void) {
        try {
            const token: string = req?.cookies?.[CookieNames.ACCESS_TOKEN];
            if (!token) throw new UnauthorizedException();
            else {
                const tokenUser: IUser = verifyToken(token);
                const user = await this.userService.findUserByPk(tokenUser.id);
                if (!user) throw new UnauthorizedException();
                req.user = user;
                next();
            }
        } catch (e) {
            res.clearCookie(CookieNames.ACCESS_TOKEN);

            if (getIsInValidStatus(e.status)) throw new UnauthorizedException();
            else throw new InternalServerErrorException(e.message || "INTERVAL_SERVER_ERROR");
        }
    }
}

@Injectable()
export class AuthenticationAdminMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService
    ) {
    }
    async use(req, res, next: () => void) {
        try {
            const token: string = req?.cookies?.[CookieNames.ACCESS_TOKEN];
            if (!token) throw new UnauthorizedException();
            else {
                const tokenUser: IUser = verifyToken(token);
                const user = await this.userService.findUserByPk(tokenUser.id);
                if (!user) throw new UnauthorizedException();
                else if (!user.isAdmin) throw new ForbiddenException();
                req.user = user;
                next();
            }
        } catch (e) {
            res.clearCookie(CookieNames.ACCESS_TOKEN);

            if (e.status === 401) throw new UnauthorizedException();
            else if (e.status === 403) throw new ForbiddenException();
            else throw new InternalServerErrorException(e.message || "INTERVAL_SERVER_ERROR");
        }
    }
}

export const getIsInValidStatus = (status: number): boolean => {
    const inValidStatus: Set<number> = new Set<number>([401, 403, 404]);
    return inValidStatus.has(status);
};
