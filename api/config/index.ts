const dotenv = require('dotenv');
dotenv.config();

interface DatabaseConfig {
    name: string;
    user: string;
    password: string;
    host: string;
    port: number;
}

interface Config {
    database: DatabaseConfig;
}

const config: Config = {
    database: {
        name: process.env.DB_NAME!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT!, 10) || 5432,
    },
};

export { Config, DatabaseConfig, config };
