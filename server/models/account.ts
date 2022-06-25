import {model, Schema} from 'mongoose';
import {Validator} from '../utils/validator';

export enum UserRole {
	user = 'user',
	admin = 'admin',
}

export interface IAccount {
	name: string;
	email: string;
	password: string;
	avatar?: string;
	role: UserRole;
  access?: string;
  refresh?: string;
}

const AccountSchema = new Schema<IAccount>(
	{
		name: {type: String, required: true, maxlength: 64, minlength: 4},
		email: {
			type: String,
			required: true,
			maxlength: 64,
			minlength: 5,
			unique: true,
			validate: [Validator.isEmail, 'Invalid Email'],
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 256,
			validate: [Validator.isPassword, 'Invalid Password'],
		},
		avatar: {type: String, validate: [Validator.isUrl, 'Invalid Url']},
		role: {
			type: String,
			required: true,
			default: UserRole.user,
			validate: [Validator.isUserRole, 'Invalid User Role'],
		},
    access: String,
    refresh: String,
	},
	{timestamps: true}
);

export const Account = model('user', AccountSchema);
