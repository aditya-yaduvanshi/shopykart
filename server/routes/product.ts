import {Router} from 'express';
import {ObjectId, FilterQuery} from 'mongoose';
import {Auth} from '../middlewares';
import {Product, IProduct} from '../models';

const router = Router();

interface IProductSearch {
	category?: ObjectId;
	minPrice?: number;
	maxPrice?: number;
	brand?: string;
	search?: string;
	limit?: number;
	page?: number;
}

router
	.route('/')
	.get(async (req, res) => {
		try {
			const query: IProductSearch = req.query;
			const LIMIT = query.limit || 20,
				PAGE = query.page || 1;
			const search: FilterQuery<IProduct> = {};

			if (query.category) search.category = query.category;
			if (query.brand) search.brand = {$in: query.brand.toUpperCase()};
			if (query.minPrice) search.price = {$gte: Number(query.minPrice)};
			if (query.maxPrice) search.price = {$lte: Number(query.maxPrice)};
			if (query.search) search.$text = {$search: query.search};

			const products = await Product.find(search)
				.skip(PAGE > 0 ? LIMIT * (PAGE - 1) : 0)
				.limit(LIMIT);
			return res.status(200).json({products});
		} catch (err) {
			console.log('err', (err as Error).message);
			return res.sendStatus(500);
		}
	})
	.post(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {
		try {
			const body: IProduct = req.body;
			if (
				!body.name ||
				!body.price ||
				!body.currency ||
				!body.category ||
				!body.brand
			)
				return res.status(400).json({msg: 'Missing Data!'});

			const product = new Product({
				name: body.name,
				price: body.price,
				currency: body.currency,
				category: body.category,
				brand: body.brand,
			});

			if (body.image) product.image = body.image;
			if (body.images && body.images.length) product.images = body.images;
			if (body.description) product.description = body.description;
			if (body.attributes) product.attributes = body.attributes;

			await product.save();
			return res.sendStatus(201);
		} catch (err) {
			console.log('err', (err as Error).message);
			return res.sendStatus(500);
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			const id = req.params.id;
			const product = await Product.findById(id);
			if (!product) return res.status(404).json({msg: 'Product Not Found!'});
			return res.status(200).json({product});
		} catch (err) {
			console.log('err', (err as Error).message);
			return res.sendStatus(500);
		}
	})
	.put(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {
		try {
			const {
				body,
				params: {id},
			} = req;
			if (!Object.entries(body).length)
				return res.status(400).json({msg: 'Missing Data!'});

			const updatedProduct: Partial<IProduct> = {};

			if (body.name) updatedProduct.name = body.name;
			if (body.image) updatedProduct.image = body.image;
			if (body.description) updatedProduct.description = body.description;
			if (body.price) updatedProduct.price = body.price;
			if (body.currency) updatedProduct.currency = body.currency;
			if (body.images && body.images.length)
				updatedProduct.images = body.images;
			if (body.brand) updatedProduct.brand = body.brand;
			if (body.category) updatedProduct.category = body.category;

			await Product.findByIdAndUpdate(id, updatedProduct);
			return res.status(200).json({msg: 'Product Updated!'});
		} catch (err) {
			console.log('err', (err as Error).message);
			return res.sendStatus(500);
		}
	})
	.delete(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {
		try {
			const id = req.params.id;
			await Product.findByIdAndDelete(id);
			return res.status(200).json({msg: 'Product Deleted!'});
		} catch (err) {
			console.log('err', (err as Error).message);
			return res.sendStatus(500);
		}
	});

export {router as productRouter};
