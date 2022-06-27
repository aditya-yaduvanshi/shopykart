import {Schema, model, CallbackWithoutResultAndOptionalError} from 'mongoose';

export interface ICategory {
	name: string;
	icon: string;
}

const CategorySchema = new Schema<ICategory>({
	name: {type: String, required: true, unique: true, maxlength: 100},
	icon: {type: String, required: true, maxlength: 64},
});

function transform(next: CallbackWithoutResultAndOptionalError) {
	this.name = this.name.toUpperCase();
	next();
}

CategorySchema.pre('save', transform);

CategorySchema.pre('updateOne', transform);

export const Category = model('categories', CategorySchema);
