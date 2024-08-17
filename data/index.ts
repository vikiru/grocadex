import config from '@/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(config.database.name, config.database.user, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: 'postgres',
    logging: true,
});

export default sequelize;
