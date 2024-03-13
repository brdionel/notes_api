import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
})

export const Category = mongoose.model("Category", categorySchema);

export class CategoryModel {
    static async getAll() {
        try {
            const categories = await Category.find().select("-__v");
            return categories;
        } catch(error) {
            console.log(error)
        }
    }

    static async create({name}) {
        try {
            const existeCategory = await Category.findOne({name});
            if(existeCategory) {
                const error = new Error("La categoria ya existe");
                return {msg: error.message}
            }

            const category = new Category({name})
            const categorySaved = await category.save();
            return categorySaved;
        } catch (error) {
            throw new Error("Error creating categories");
        }
    }
}
