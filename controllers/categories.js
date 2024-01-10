import { CategoryModel } from "../models/categories.js";

export class CategoriesController {
  static async getAll(req, res, next) {
    try {
      const categories = await CategoryModel.getAll();
      if (!categories)
        return res
          .status(404)
          .json({ message: "nao achamos category nenhuma" });
      return res.json({
        categories,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = categories.find((category) => category.id === id);
      if (!category)
        return res.status(404).json({
          message: "A Categoria nao foi achhada",
        });
      return res.json(category);
    } catch (error) {
      next(error);
    }
  }
}
