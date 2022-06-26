import {Schema, model, Types, ObjectId} from 'mongoose';
import {Validator} from '../utils';
import {ICart, ICartItem, CartItemSchema, CartSchema} from './cart';
import {ProductSchema} from './product';

export enum PaymentModes {
	card = 'card',
	upi = 'upi',
	cod = 'cod',
}

export enum OrderStatus {
	pending = 'pending',
	accepted = 'accepted',
	received = 'received',
	arriving = 'arriving',
	shipped = 'shipped',
	rejected = 'rejected',
	cancelled = 'cancelled',
}

export interface IOrderItem extends ICartItem {
	deliveryDate: string;
}

export interface IOrder extends ICart {
	paymentMode: PaymentModes;
	status: OrderStatus;
}

export const OrderItemSchema = new Schema<IOrderItem>(
	{
		...CartItemSchema.obj,
		deliveryDate: {
			type: String,
			required: true,
			default: new Date().toLocaleDateString(),
			validate: [Validator.isValidDate, 'Invalid Date!'],
		},
	},
	{timestamps: true}
);

const OrderSchema = new Schema<IOrder>(
	{
		...CartSchema.obj,
		paymentMode: {type: String, default: PaymentModes.cod, required: true},
		status: {type: String, default: OrderStatus.pending, required: true},
	},
	{timestamps: true}
);

export const Order = model('orders', OrderSchema);
