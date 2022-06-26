import {model, ObjectId, Schema, Types} from 'mongoose';
import {Validator} from '../utils';

export interface IProduct {
	name: string;
	slug: string;
	description?: string;
	price: number;
	image?: string;
	category: ObjectId;
	brand: string;
	attributes?: object;
}

export const ProductSchema = new Schema<IProduct>(
	{
		name: {type: String, required: true, maxlength: 100},
		slug: {type: String, required: true, maxlength: 500, unique: true},
		price: {type: Number, required: true, min: 1, max: 99999999},
		image: {
			type: String,
			maxlength: 500,
			validate: [Validator.isUrl, 'Invalid Url'],
		},
		category: {type: Types.ObjectId, required: true, ref: 'categories'},
		brand: {type: String, required: true, maxlength: 100},
		description: {type: String, maxlength: 5000},
		attributes: {type: Object, maxlength: 100},
	},
	{timestamps: true}
);

ProductSchema.pre('save', function (next) {
	this.slug = this.name.replace(/\s/, '-').concat(`-${this._id}`);
	next();
});

export const Product = model('products', ProductSchema);
