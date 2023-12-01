import express from 'express';
import { authController } from '../controllers/auth_controller.js';

export const authRouter = new express.Router();

authRouter.post('/users', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/users/:id', authController.getUserById);
authRouter.put('/users/:id', authController.updateUser);