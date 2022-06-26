import jwt, {JwtPayload} from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {config} from 'dotenv';
import { Types } from 'mongoose';
import { readFileSync } from 'fs';

config();

export interface IJwtPayload extends JwtPayload {
	email: string;
	role: string;
	_id: Types.ObjectId;
}

const {SALT_ROUNDS} = process.env;
const privateAccessKey = readFileSync('private.rsa.key');
const privateRefreshKey = readFileSync('private.es.key');

export class Verifier {
	static async createHash(password: string) {
		return await bcrypt.hash(password, Number(SALT_ROUNDS) || 10);
	}

	static async verifyHash(password: string, hash: string) {
		return await bcrypt.compare(password, hash);
	}

	static async createAccess(user: IJwtPayload) {
		return jwt.sign(user, privateAccessKey, {
			algorithm: 'RS256',
			expiresIn: '1d',
		});
	}

	static async verifyAccess(access: string) {
		return jwt.verify(access, privateAccessKey, {
			algorithms: ['RS256'],
		}) as IJwtPayload;
	}

	static async createRefresh(user: IJwtPayload) {
		return jwt.sign(user, privateRefreshKey, {
			algorithm: 'ES256',
			expiresIn: '7d',
		});
	}

	static async verifyRefresh(refresh: string) {
		return jwt.verify(refresh, privateRefreshKey, {
			algorithms: ['ES256'],
		}) as IJwtPayload;
	}
}
