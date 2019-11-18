import { Router } from 'express';

const routes = new Router();

/**
 * ROOT
 */
routes.get('/', async (req, res) => res.json({ message: 'Welcome' }));

export default routes;
