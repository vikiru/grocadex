import express = require('express');

import { apiVersionString } from '../config';
import { UserController } from '../controllers';
import { ensureAuthenticated } from './../middlewares/index';

const UserRouter = express.Router();
const baseUrl = `/${apiVersionString}/users`;

UserRouter.post(baseUrl, UserController.createUser);
UserRouter.get(`${baseUrl}/dashboard`, ensureAuthenticated, UserController.getUserById);

export { UserRouter };
