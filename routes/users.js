import { Router } from "express";
import { UsersController } from "../controllers/users.js";
const router = Router();

router.get("/", UsersController.getAll);

router.get("/:id", UsersController.getById);

router.patch("/:id", UsersController.update);

router.delete("/:id", UsersController.delete);

export default router;
