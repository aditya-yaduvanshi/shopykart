import express, {Request, Response} from 'express';
import {config} from 'dotenv';
import path from 'path';
import compression from 'compression';
import mongoose from 'mongoose';
import cors from 'cors';
import {
	accountRouter,
	productRouter,
	categoryRouter,
	cartRouter,
	orderRouter,
} from './routes';
config();

const app = express();
const {PORT, MONGO_URI, NODE_ENV} = process.env;

app.use(cors());
app.use(compression());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/api', async (_req: Request, res: Response) => {
	res.send('Om Namah Shivay');
});
app.use('/api/categories', categoryRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/carts', cartRouter);

app.use('/assets', express.static(path.join(__dirname, '../client/assets')));
app.get('*', (_req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

mongoose
	.connect(`${MONGO_URI}`)
	.then((_) => {
		console.log('db connected!')
		app.listen(PORT || 5000, () => console.log('server listening on:', PORT));
	})
	.catch((err) => console.error('DB ERROR', err));
