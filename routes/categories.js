import { Router } from "express";
import { CategoriesController } from "../controllers/categories.js";

export const createCategoryRouter = ({ CategoryModel }) => {

    const router = Router();

    const CategoryController = new CategoriesController({ CategoryModel });
    
    router.get("/", CategoryController.getAll);
    router.post("/", CategoryController.create);
    router.get("/:id", CategoryController.getById);

    return router;
}
