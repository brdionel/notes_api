import { Router } from "express";
import { NotesController } from "../controllers/notes.js";
import { userExtractor } from "../middleware/userExtractor.js";
const router = Router();

router.get("/", userExtractor, NotesController.getAll);

router.get("/:id", userExtractor, NotesController.getById);

router.patch("/:id", userExtractor, NotesController.update);

router.post("/", userExtractor, NotesController.create);

router.delete("/:id", userExtractor, NotesController.delete);

export default router;
