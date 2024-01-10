import { Router } from "express";
import { CategoriesController } from "../controllers/categories.js";
const router = Router();

router.get("/", CategoriesController.getAll);

router.get("/:id", CategoriesController.getById);

export default router;
