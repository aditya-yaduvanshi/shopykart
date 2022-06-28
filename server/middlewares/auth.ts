import {Request, Response, NextFunction} from 'express';
import {Verifier, IJwtPayload} from '../utils';

export interface IRequest extends Request {
  user?: IJwtPayload 
}

export class Auth {
	static async isAuthenticated(
		req: IRequest,
		res: Response,
		next: NextFunction
	) {
		try {
			const access = req.headers.authorization?.split(' ')[1];
			if (!access) return res.sendStatus(401);
			const user = await Verifier.verifyAccess(access);
			if (!user) return res.status(400).json({msg: 'Invalid Token!'});
			req.user = user;
			next();
		} catch (err) {
			console.log('authentication error', (err as Error).message);
			return res.sendStatus(500);
		}
	}

	static async isAuthorised(req: IRequest, res: Response, next: NextFunction) {
		const user = req.user;
		if (user?.role !== 'admin') return res.sendStatus(403);
		next();
	}
}
