import {Router} from 'express';
import { Auth } from '../middlewares';
import { Order } from '../models';

const router = Router();

router
  .route('/')
  .all(Auth.isAuthenticated)
  .get(async (req, res) => {

  })
  .post(async (req, res) => {

  })

router
  .route('/:id')
  .all(Auth.isAuthenticated)
  .get(async (req, res) => {

  })
  .put(async (req, res) => {

  })
  .delete(async (req, res) => {

  })

export {router as orderRouter};
