import { Router } from 'express';

// CONTROLLERS
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

/**
 * ROOT
 */
routes.get('/', async (req, res) => res.json({ message: 'Welcome' }));

/**
 * SESSION PARA JWT
 */
routes.post('/sessions', SessionController.store);

/**
 * USER
 */
routes.post('/users', UserController.store);

export default routes;
