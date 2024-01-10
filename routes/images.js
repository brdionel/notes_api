import { Router } from "express";
import { ImagesController } from "../controllers/images.js";

const router = Router();

router.get("/", ImagesController.getAll);

export default router;
