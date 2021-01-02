import {SequelizeModuleOptions} from "@nestjs/sequelize";
import {User} from "./models/user.model";

const dbConfig = (): SequelizeModuleOptions => {
    return {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        timezone: '.envAsia/Seoul',
        define: {
            timestamps: false
        },
        models: [User],
    }
};

export default dbConfig;
