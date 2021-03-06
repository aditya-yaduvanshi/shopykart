import {CallbackError, model, Schema, Document} from 'mongoose';
import {Modifier, Verifier} from '../utils';
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
}

export interface IAccountSchema extends IAccount, Document {
	access?: string;
	refresh?: string;
	createdAt: Date;
	updatedAt: Date;
}

const AccountSchema = new Schema<IAccountSchema>(
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

AccountSchema.pre('save', async function (next) {
	try {
		this.name = Modifier.capitalize(this.name);
		this.password = await Verifier.createHash(this.password);
		next();
	} catch (err) {
		console.log('pre save',err);
		next(err as CallbackError);
	}
});

AccountSchema.pre('updateOne', {document: true, query: false}, async function (next) {
	try {
		if(this.isModified('name'))
			this.name = Modifier.capitalize(this.name);

		if(this.isModified('password'))
			this.password = await Verifier.createHash(this.password);
		
		next();
	} catch (err) {
		console.log('pre update one', err);
		next(err as CallbackError);
	}
})

export const Account = model('accounts', AccountSchema);
