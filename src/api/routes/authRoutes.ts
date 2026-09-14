import express from 'express';
import passport from 'passport';

import { apiVersionString } from '@/api/config/index';
import { AuthController } from '@/api/controllers/';

const baseUrl = `/${apiVersionString}/auth`;

const AuthRouter = express.Router();

AuthRouter.post(`${baseUrl}/login`, passport.authenticate('local'), AuthController.loginUser);

AuthRouter.post(`${baseUrl}/refresh`, AuthController.refreshToken);

AuthRouter.post(`${baseUrl}/logout`, AuthController.logoutUser);

export { AuthRouter };
