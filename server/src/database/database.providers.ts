import { Sequelize } from 'sequelize-typescript';

import { SEQUELIZE, DEVELOPMENT, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import {User} from "../models/user.model";

export const databaseProviders = [
    {
        provide: SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case DEVELOPMENT:
                    config = databaseConfig.development;
                    break;
                case PRODUCTION:
                    config = databaseConfig.production;
                    break;
                default:
                    config = databaseConfig.development;
            }
            const sequelize = new Sequelize(config);
            sequelize.addModels([
                User
            ]);
            await sequelize.sync({
                alter: false,
                force: false,
            });
            return sequelize;
        },
    },
];
