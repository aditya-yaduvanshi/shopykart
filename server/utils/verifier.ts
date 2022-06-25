import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {config} from 'dotenv';

config();

const {SALT_ROUNDS, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = process.env;

export class Verifier {
	static async createHash(password: string) {
		return await bcrypt.hash(password, Number(SALT_ROUNDS) || 10);
	}

	static async verifyHash(password: string, hash: string) {
		return await bcrypt.compare(password, hash);
	}

	static async createAccess(email: string) {
		return jwt.sign(email, `${JWT_ACCESS_SECRET}`, {
			algorithm: 'RS256',
			expiresIn: '1d',
		});
	}

	static async verifyAccess(access: string) {
		return jwt.verify(access, `${JWT_ACCESS_SECRET}`);
	}

	static async createRefresh(email: string) {
		return jwt.sign(email, `${JWT_REFRESH_SECRET}`, {
			algorithm: 'ES256',
			expiresIn: '7d',
		});
	}

	static async verifyRefresh(refresh: string) {
		return jwt.verify(refresh, `${JWT_ACCESS_SECRET}`);
	}
}
