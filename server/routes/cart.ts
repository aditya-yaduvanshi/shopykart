import {Router} from 'express';
import { Auth } from '../middlewares';
import { Cart } from '../models';

const router = Router();

router
  .route('/')
  .post(Auth.isAuthenticated, async (req, res) => {
    try {
      
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
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

export {router as cartRouter};