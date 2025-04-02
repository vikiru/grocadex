import express from 'express';
import passport from 'passport';
import { apiVersionString } from '~config/index';
import { UserController } from '~controllers/';

const UserRouter = express.Router();
const baseUrl = `/${apiVersionString}/users`;

UserRouter.post(baseUrl, UserController.createUser);
UserRouter.get(
    `${baseUrl}/dashboard`,
    passport.authenticate('jwt', { session: false }),
    UserController.getUserData,
);

export { UserRouter };
