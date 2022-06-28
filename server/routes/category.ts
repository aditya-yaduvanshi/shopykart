import {Router} from 'express';
import {Auth} from '../middlewares';
import {Category, ICategory} from '../models';

const router = Router();

router
	.route('/')
	.get(async (_req, res) => {
		try {
			const categories = await Category.find();
			return res.status(200).json({categories});
		} catch (err) {
			console.log('err',(err as Error).message);
			return res.sendStatus(500);
		}
	})
	.post(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {
		try {
			const body: ICategory = req.body;
			if (!body.name || !body.icon)
				return res.status(400).json({msg: 'Invalid Data!'});

			const category = new Category({
				name: body.name,
				icon: body.icon,
			});
			await category.save();
			return res.sendStatus(201);
		} catch (err) {
			console.log('err',(err as Error).message);
			return res.sendStatus(500);
		}
	});

router
	.route('/:id')
	.get(async (req, res) => {
		try {
			const id = req.params.id;
			const category = await Category.findById(id);
			if(!category) return res.status(404).json({msg: 'Category Not Found!'});
			return res.status(200).json({category});
		} catch (err) {
			console.log('err',(err as Error).message);
			return res.sendStatus(500);
		}
	})
	.put(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {
		try {
			let {
				body,
				params: {id},
			} = req;
			if (!body.name && !body.icon)
				return res.status(400).json({msg: 'Invalid Data!'});

			const updatedCategory: Partial<ICategory> = {};
			if (body.name) updatedCategory.name = body.name;
			if (body.icon) updatedCategory.icon = body.icon;

			await Category.findByIdAndUpdate(id, updatedCategory);
			return res.status(200).json({msg: 'Category Updated!'});
		} catch (err) {
			console.log('err',(err as Error).message);
			return res.sendStatus(500);
		}
	})
	.delete(Auth.isAuthenticated, Auth.isAuthorised, async (req, res) => {
		try {
			const id = req.params.id;
			await Category.findByIdAndDelete(id);
			return res.status(200).json({msg: 'Category Deleted!'});
		} catch (err) {
			console.log('err',(err as Error).message);
			return res.sendStatus(500);
		}
	});

export {router as categoryRouter};
