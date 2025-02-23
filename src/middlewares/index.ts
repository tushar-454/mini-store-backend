import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { logger } from '../middlewares/logger';
import routes from '../routes';
import { globalError } from './global_error';

const CLIENT_URL = process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL_PROD : process.env.NODE_ENV === 'development' ? process.env.CLIENT_URL_DEV : '';

const applyMiddleware = (app: Application): void => {
  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(logger);
  app.use(routes);
  app.use(globalError);
};

export { applyMiddleware };
