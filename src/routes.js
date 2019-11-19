import { Router } from 'express';
import multer from 'multer';

// CONFIGS
import multerConfig from './config/multer';

// MIDDLEWARES
import authMiddleware from './app/middlewares/auth';

// CONTROLLERS
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * ROOT
 */
routes.get('/', async (req, res) => res.json({ message: 'Welcome' }));

/**
 * SESSION PARA JWT
 */
routes.post('/sessions', SessionController.store);

/**
 * UPLOAD
 */
routes.post(
  '/files',
  authMiddleware,
  upload.single('file'),
  FileController.store
);

/**
 * USER
 */
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);

export default routes;
