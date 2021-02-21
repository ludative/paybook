import {CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor} from "@nestjs/common";
import {Sequelize} from "sequelize-typescript";
import {Observable, throwError} from "rxjs";
import {Transaction} from "sequelize";
import {catchError, tap} from "rxjs/operators";
import {SEQUELIZE} from "../constants";

@Injectable()
export class TransactionInterceptor implements NestInterceptor {

    constructor(
        @Inject(SEQUELIZE)
        private readonly sequelizeInstance: Sequelize
    ) { }

    async intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const req = httpContext.getRequest();

        const transaction: Transaction = await this.sequelizeInstance.transaction();
        req.transaction = transaction;
        return next.handle().pipe(
            tap(() => {
                transaction.commit();
            }),
            catchError(err => {
                transaction.rollback();
                return throwError(err);
            })
        );
    }
}
