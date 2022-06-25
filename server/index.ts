import express, {Request, Response} from 'express';
import {config} from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
config();

const app = express();
const {PORT, MONGO_URI} = process.env;

app.get('/api', async (_req: Request, res: Response) => {
	res.send('Om Namah Shivay');
});

app.use(express.static(path.join(__dirname, '../client/assets')));

app.get('*', (_req, res) => {
	res.sendFile(path.join(__dirname, '../client/index.html'));
});

mongoose
	.connect(`${MONGO_URI}`)
	.then((_) => console.log('db connected!'))
	.catch((err) => console.error('DB ERROR', err));

app.listen(PORT || 5000, () => console.log('server listening on:', PORT));
