export class CategoriesController {
  constructor ({ CategoryModel }) {
    this.CategoryModel = CategoryModel
  }
  getAll = async (req, res, next) => {
    try {
      const categories = await this.CategoryModel.getAll();
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

  getById = async (req, res, next) => {
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

  create = async (req, res, next) => {
    try {
      const { name } = req.body;
      const response = await this.CategoryModel.create({name})
      res.json(response)
    } catch(error) {
      next(error)
    }
  }
}
