import {Schema, model, Types, ObjectId, Model} from 'mongoose';
import { IProduct, ProductSchema } from './product';

export interface ICartItem extends IProduct {
  quantity: number;
  totalPrice: number;
}

export interface ICart extends Document {
	user: ObjectId;
	items: Types.DocumentArray<ICartItem>;
	totalCount: number;
	totalPrice: number;
}

export const CartItemSchema = new Schema<ICartItem>(
	{
		...ProductSchema.obj,
		quantity: {type: Number, required: true, min: 1, max: 99999999},
    totalPrice: {type: Number, required: true, min: 1, max: 99999999},
	},
	{timestamps: true}
);

delete CartItemSchema.obj.description;
delete CartItemSchema.obj.attributes;

export const CartSchema = new Schema<ICart>(
	{
		user: {type: Types.ObjectId, required: true, unique: true, ref: 'accounts'},
		items: {
			type: [CartItemSchema],
			required: true,
			minlength: 1,
			maxlength: 99999999,
		},
		totalCount: {type: Number, required: true, min: 1, max: 99999999},
		totalPrice: {type: Number, required: true, min: 1, max: 99999999},
	},
	{timestamps: true}
);

export const Cart = model('carts', CartSchema);
