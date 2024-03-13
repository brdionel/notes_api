import { Router } from "express";
import { NotesController } from "../controllers/notes.js";
import { userExtractor } from "../middleware/userExtractor.js";

export const createNoteRouter = ({ NoteModel }) => {

    const router = Router();

    const notesController = new NotesController({ NoteModel })
    
    router.get("/", userExtractor, notesController.getAll);
    
    router.get("/:id", userExtractor, notesController.getById);
    
    router.patch("/:id", userExtractor, notesController.update);
    
    router.post("/", userExtractor, notesController.create);
    
    router.delete("/:id", userExtractor, notesController.delete);

    return router;
}
