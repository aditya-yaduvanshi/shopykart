import {Schema, model, Document} from 'mongoose';

export interface ICategory extends Document {
	name: string;
	icon: string;
}

const CategorySchema = new Schema<ICategory>({
	name: {type: String, required: true, unique: true, maxlength: 100},
	icon: {type: String, required: true, maxlength: 64},
});

export const Category = model('categories', CategorySchema);
