import express from 'express';
import passport from 'passport';
import { apiVersionString } from '~config/index';
import { AuthController } from '~controllers/';

const baseUrl = `/${apiVersionString}/auth`;

const AuthRouter = express.Router();

AuthRouter.post(
    `${baseUrl}/login`,
    passport.authenticate('local'),
    AuthController.loginUser,
);

AuthRouter.post(
    `${baseUrl}/logout`,

    AuthController.logoutUser,
);

export { AuthRouter };
