import { Router } from 'express';

// CONTROLLERS
import UserController from './app/controllers/UserController';

const routes = new Router();

/**
 * ROOT
 */
routes.get('/', async (req, res) => res.json({ message: 'Welcome' }));

/**
 * USER
 */
routes.post('/users', UserController.store);

export default routes;
