import {Router} from 'express';
import { Auth } from '../middlewares';
import { Category } from '../models';

const router = Router();

router
  .route('/')
  .get(async (req, res) => {

  })
  .post(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {

  })

router
  .route('/:id')
  .get(async (req, res) => {

  })
  .put(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {

  })
  .delete(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {

  })

export {router as categoryRouter};