const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '../../../.env') });

export const databaseUrl = process.env.DATABASE_URL;
export const apiVersion = 'v1';
export const apiVersionString = `api/${apiVersion}`;
export const port = process.env.EXPRESS_PORT || 3000;
export const env = process.env.NODE_ENV || 'development';
export const secret = process.env.JWT_SECRET;
