import { Routes } from 'nest-router';
import {ApiModule} from "./api/api.module";
import {HistoryModule} from "./api/history/history.module";
import {CodeModule} from "./api/code/code.module";
import {UserModule} from "./api/user/user.module";
import {PayBookModule} from "./api/payBook/payBook.module";

export const routes: Routes = [
    {
        path: '/api',
        module: ApiModule,
        children: [
            {path: '/histories', module: HistoryModule},
            {path: '/codes', module: CodeModule},
            {path: '/users', module: UserModule},
            {path: '/pay-books', module: PayBookModule}
        ]
    },
];
