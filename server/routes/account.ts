import {Router} from 'express';
import {Account, UserRole} from '../models';
import {Auth, IRequest} from '../middlewares';
import {Validator, Verifier} from '../utils';

const router = Router();

interface IAuthGet {
	email: string;
	password: string;
}

interface IAuthPost extends IAuthGet {
	name: string;
	avatar?: string;
	password2: string;
	role?: UserRole;
}

router
	.route('/auth')
	.get(async (req, res) => {
		try {
			const body = req.body as IAuthGet;
			if (
				!body.email ||
				!body.password ||
				!Validator.isEmail(body.email) ||
				!Validator.isPassword(body.password)
			)
				return res.status(400).json({msg: 'Invalid Data!'});

			const user = await Account.findOne({email: body.email});
			if (!user) return res.status(400).json({msg: 'Account Not Found!'});

			const verified = await Verifier.verifyHash(body.password, user.password);
			if (!verified) return res.status(400).json({msg: 'Invalid Data!'});

			const jwtpayload = {
				_id: user._id,
				email: user.email,
				role: user.role,
			};

			const [access, refresh] = await Promise.all([
				Verifier.createAccess(jwtpayload),
				Verifier.createRefresh(jwtpayload),
			]);

			await user.updateOne({access, refresh});
			return res.status(200).json({
				...jwtpayload,
				email: user.email,
				name: user.name,
				avatar: user.avatar,
				access: {
					token: access,
					expiresIn: '1d',
				},
				refresh: {
					token: refresh,
					expiresIn: '7d',
				},
			});
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	})
	.post(async (req, res) => {
		try {
			const body = req.body as IAuthPost;
			if (
				!body.name ||
				!body.email ||
				!body.password ||
				!body.password2 ||
				body.password !== body.password2
			)
				return res.status(400).json({msg: 'Invalid Data!', body});

			const account = new Account({
				name: body.name,
				email: body.email,
				password: body.password,
				role: UserRole.user,
			});
			if (body.avatar) account.avatar = body.avatar;

			await account.save();
			return res.sendStatus(201);
		} catch (err) {
			console.log('err', err);
			return res.sendStatus(500);
		}
	});

router
	.route('/me')
	.all(Auth.isAuthenticated)
	.get(async (req: IRequest, res) => {
		try {
			const me = await Account.findById(req.user?._id);
			if (!me) return res.sendStatus(400);

			return res.status(200).json({
				name: me.name,
				email: me.email,
				avatar: me.avatar,
				_id: me._id,
				createdAt: me.createdAt,
				updatedAt: me.updatedAt,
			});
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	})
	.put(async (req: IRequest, res) => {
		try {
			if (!req.user) return res.sendStatus(401);
			const body = req.body as Partial<IAuthPost>;
			if (!Object.keys(body).length) return res.sendStatus(400);

			// just implementing update api, No email verification or another api for forgot/update password for now.
			const updatedUser: Partial<IAuthPost> = {};
			if (body.name) updatedUser.name = body.name;
			if (body.email) updatedUser.email = body.email;
			if (body.password) updatedUser.password = body.password;
			if (
				body.role &&
				req.user.role === UserRole.admin &&
				Validator.isUserRole(body.role)
			)
				updatedUser.role = body.role;

			await Account.findByIdAndUpdate(req.user._id, updatedUser);
			return res.status(200).json({msg: 'Account Updated!'});
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	})
	.delete(async (req: IRequest, res) => {
		try {
			const user = req.user;
			if (!user) return res.sendStatus(401);
			await Account.findByIdAndDelete(user._id);
			return res.status(200).json({msg: 'Account Deleted!'});
		} catch (err) {
			console.log(err);
			return res.sendStatus(500);
		}
	});

export {router as accountRouter};
