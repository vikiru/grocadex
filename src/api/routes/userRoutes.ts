import express from 'express';
import passport from 'passport';

import { apiVersionString } from '@/api/config/index';
import { UserController } from '@/api/controllers/';

const UserRouter = express.Router();
const baseUrl = `/${apiVersionString}/users`;

UserRouter.post(baseUrl, UserController.createUser);
UserRouter.get(`${baseUrl}/dashboard`, passport.authenticate('jwt', { session: false }), UserController.getUserData);

export { UserRouter };
