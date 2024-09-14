import express from 'express';
import { apiVersionString } from '~config/index';
import { ActiveItemController } from '~controllers/';
import { ensureAuthenticated } from '~middlewares/';

const ActiveItemRouter = express.Router();

const baseUrl = `/${apiVersionString}/active-items`;

ActiveItemRouter.post(baseUrl, ensureAuthenticated, ActiveItemController.createActiveItems);
ActiveItemRouter.get(baseUrl, ensureAuthenticated, ActiveItemController.getActiveItems);
ActiveItemRouter.delete(`${baseUrl}`, ensureAuthenticated, ActiveItemController.deleteActiveItems);

export { ActiveItemRouter };
