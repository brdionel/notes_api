import { Router } from "express";
import { RegistrationController } from "../controllers/registration.js";
const router = Router();

router.post("/signup", RegistrationController.create);
router.post("/login", RegistrationController.login);

export default router;
