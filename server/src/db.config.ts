import {SequelizeModuleOptions} from "@nestjs/sequelize";
import {User} from "./models/user.model";

const dbConfig = (): SequelizeModuleOptions => {
    return {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        timezone: process.env.DB_TIME_ZONE,
        define: {
            timestamps: false
        },
        synchronize: true,
        models: [
            User
        ],
    }
};

export default dbConfig;
