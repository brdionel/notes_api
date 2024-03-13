import jwt from "jsonwebtoken";
import { validateNote, validatePatialNote } from "../schemas/notes.js";

export class NotesController {
  constructor ({ NoteModel }) {
    this.NoteModel = NoteModel
  }
  getAll = async (req, res, next) => {
    try {
      const { userId } = req;
      const { page } = req.query;
      const response = await this.NoteModel.getAll({userId, page});
      if (!response)
        return res.status(404).json({ message: "nao achamos note nenhum" });
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  getById = async (req, res) => {
    // const { id } = req.params;
    // const note = notes.find((note) => note.id === id);
    // if (!note)
    //   return res.status(404).json({
    //     message: "A nota nao foi achhada",
    //   });
    // return res.json(note);
  }

  create = async (req, res, next) => {
    try {
      const result = validateNote(req.body);
      
      if (result.error) {
        return res.status(400).json({
          error: JSON.parse(result.error.message),
        });
      }

      const { userId } = req;

      const input = {
        userId,
        ...result.data,
      };
      const newNote = await this.NoteModel.create(input);
      if (!newNote) {
        return res.status(500).json({
          message: "tem error no create new note",
        });
      }
      return res.status(201).json(newNote);
    } catch (error) {
      next(error);
    }
  }

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = validatePatialNote(req.body);
      if (result.error) {
        return res.status(400).json({
          error: JSON.parse(result.error.message),
        });
      }
      const { userId } = req;
      const input = {
        userId,
        ...result.data,
      };
      const updatedNote = await this.NoteModel.update(id, input);
      res.json({
        success: true,
        updatedNote,
      });
    } catch (error) {
      next(error);
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req;
      const response = await this.NoteModel.delete(id, userId);
      if (!response)
        return res.status(404).json({
          message: "Note not found",
        });
      return res.json({
        message: "Note deleted",
        noteIdDeleted: id,
      });
    } catch (error) {
      next(error);
    }
  }
}
