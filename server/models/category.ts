import {Schema, model, CallbackWithoutResultAndOptionalError, Document} from 'mongoose';

export interface ICategory {
	name: string;
	icon: string;
}

export interface ICategorySchema extends ICategory, Document {
	createdAt: Date;
	updatedAt: Date;
}

const CategorySchema = new Schema<ICategorySchema>({
	name: {type: String, required: true, unique: true, maxlength: 100},
	icon: {type: String, required: true, maxlength: 64},
});

CategorySchema.pre('save', function (next) {
	this.name = this.name.toUpperCase();
	next();
});

CategorySchema.pre('updateOne', {document: true, query: false}, function (next) {
	if(this.isModified(this.name))
		this.name = this.name.toUpperCase();
	next();
});

export const Category = model('categories', CategorySchema);
