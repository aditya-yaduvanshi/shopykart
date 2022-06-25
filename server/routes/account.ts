import {Router} from 'express';
import { Account } from '../models';

const router = Router();

router
  .route('/auth')
  .get(async (req, res) => {
    
  })
  .post(async (req, res) => {
    const account = new Account({
      name: 'user',
      email: 'email',
      password: 'password',
      role: 'user'
    })
    account.save();
  })

router
  .route('/me')
  .get(async (req, res) => {

  })
  .post(async (req, res) => {

  })
  .put(async (req, res) => {

  })
  .delete(async (req, res) => {

  })

export {router as userRouter};