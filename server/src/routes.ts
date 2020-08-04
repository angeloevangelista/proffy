import { Router } from 'express';

import ClassesController from './app/controllers/ClassesController';

const routes = Router();

routes.get('/classes', ClassesController.index);
routes.post('/classes', ClassesController.create);

export default routes;
