import {SequelizeModuleOptions} from "@nestjs/sequelize";
import * as dotenv from 'dotenv';

dotenv.config();

export interface ODatabaseConfig {
    development: SequelizeModuleOptions;
    production: SequelizeModuleOptions;
}

export const databaseConfig: ODatabaseConfig = {
    development: {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        timezone: process.env.DB_TIME_ZONE,
    },
    production: {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        timezone: process.env.DB_TIME_ZONE,
    },
};
