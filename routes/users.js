import { Router } from "express";
import { UsersController } from "../controllers/users.js";

export const createUserRouter = ({ UserModel }) => {
    const router = Router();

    const userController = new UsersController({ UserModel })
    
    router.get("/", userController.getAll);
    
    router.get("/:id", userController.getById);
    
    router.patch("/:id", userController.update);
    
    router.delete("/:id", userController.delete);
    
    return router;
}
