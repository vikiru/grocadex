import express from 'express';
import { apiVersionString } from '~config/index';
import { UserController } from '~controllers/';
import { ensureAuthenticated } from '~middlewares/';

const UserRouter = express.Router();
const baseUrl = `/${apiVersionString}/users`;

UserRouter.post(baseUrl, UserController.createUser);
UserRouter.get(
    `${baseUrl}/dashboard`,
    ensureAuthenticated,
    UserController.getUserData,
);

export { UserRouter };
