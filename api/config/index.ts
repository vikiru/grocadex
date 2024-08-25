const dotenv = require('dotenv');
dotenv.config();

export const databaseUrl = process.env.DATABASE_URL;
export const baseUrl = process.env.BASE_URL || 'api/v1';
export const port = process.env.EXPRESS_PORT;
export const env = process.env.NODE_ENV || 'development';
