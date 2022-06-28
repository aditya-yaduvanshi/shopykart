import {model, ObjectId, Schema, Types, Document} from 'mongoose';
import {Modifier, Validator} from '../utils';

export interface IProduct {
	name: string;
	description?: string;
	price: number;
	currency: string;
	image?: string;
	images?: Array<string>;
	category: ObjectId;
	brand: string;
	attributes?: object;
}

export interface IProductSchema extends IProduct, Document {
	slug: string;
	createdAt: Date;
	updatedAt: Date;
}

export const ProductSchema = new Schema<IProductSchema>(
	{
		name: {type: String, required: true, maxlength: 100},
		slug: {type: String, maxlength: 500, unique: true},
		price: {type: Number, required: true, min: 1, max: 99999999},
		currency: {type: String, required: true, maxlength: 50, default: 'INR'},
		image: {
			type: String,
			maxlength: 500,
			validate: [Validator.isUrl, 'Invalid Url'],
		},
		images: {
			type: [String],
			minlength: 1,
			maxlength: 500,
		},
		category: {type: Types.ObjectId, required: true, ref: 'categories'},
		brand: {type: String, required: true, maxlength: 100},
		description: {type: String, maxlength: 5000},
		attributes: {type: Object, maxlength: 100},
	},
	{timestamps: true}
);

ProductSchema.index({name: 'text', brand: 'text', description: 'text', attributes: 'text'});

ProductSchema.pre('save', function (next) {
	this.slug = Modifier.slugify(this.name, this._id);
	this.brand = this.brand.toUpperCase();
	this.currency = this.currency.toUpperCase();
	next();
});

ProductSchema.pre('updateOne', {document: true, query: false}, function (next) {
	if(this.isModified('name'))
		this.slug = Modifier.slugify(this.name, this._id);
	if(this.isModified(this.brand))
		this.brand = this.brand.toUpperCase();
	if(this.isModified(this.currency))
		this.currency = this.currency.toUpperCase();
	next();
});

export const Product = model('products', ProductSchema);
