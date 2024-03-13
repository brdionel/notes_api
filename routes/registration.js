import { Router } from "express";
import { RegistrationController } from "../controllers/registration.js";

export const createRegistrationRouter = ({ UserModel }) => { 

    const router = Router();

    const registrationController = new RegistrationController({ UserModel })
    
    router.post("/signup", registrationController.create);
    router.post("/login", registrationController.login);
    
    return router

}
