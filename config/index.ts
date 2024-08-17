const dotenv = require('dotenv');
dotenv.config();

interface DatabaseConfig {
    name: string;
    user: string;
    password: string;
    host: string;
    port: number;
}

interface EmailConfig {
    host: string;
    port: number;
    user: string;
    password: string;
}

interface Config {
    database: DatabaseConfig;
    email: EmailConfig;
}

const config: Config = {
    database: {
        name: process.env.DB_NAME!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT!, 10) || 5432,
    },
    email: {
        host: process.env.EMAIL_HOST!,
        port: parseInt(process.env.EMAIL_PORT!, 10) || 587,
        user: process.env.EMAIL_USER!,
        password: process.env.EMAIL_PASSWORD!,
    },
};

export default config;
