import {Router} from 'express';
import { Types } from 'mongoose';
import { Auth } from '../middlewares';
import { Product, IProduct } from '../models';

const router = Router();

interface IProductSearch {
  category?: Types.ObjectId;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  query?: string;
  limit?: number;
  page?: number;
}

router
  .route('/')
  .get(async (req, res) => {
    try {
      const _query: IProductSearch = req.query;
      const products = await Product.find();
      return res.status(200).json({products});
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  })
  .post(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {
    try {
      const body: IProduct = req.body;
      if(!body.name || !body.price || !body.currency || !body.category || !body.brand)
        return res.status(400).json({msg: 'Missing Data!'});
      
      const product = new Product({
        name: body.name,
        price: body.price,
        currency: body.currency,
        category: body.category,
        brand: body.brand,
      });

      if(body.image)
        product.image = body.image;
      if(body.images && body.images.length)
        product.images = body.images;
      if(body.description) 
        product.description = body.description;
      if(body.attributes)
        product.attributes = body.attributes;

      await product.save();
      return res.sendStatus(201);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  })

router
  .route('/:id')
  .get(async (req, res) => {

  })
  .put(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {

  })
  .delete(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {

  })

export {router as productRouter};