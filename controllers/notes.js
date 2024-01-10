import jwt from "jsonwebtoken";
import { NoteModel } from "../models/notes.js";
import { validateNote, validatePatialNote } from "../schemas/notes.js";

export class NotesController {
  static async getAll(req, res, next) {
    try {
      const { userId } = req;
      const notes = await NoteModel.getAll(userId);
      if (!notes)
        return res.status(404).json({ message: "nao achamos note nenhum" });
      res.json({
        notes,
      });
    } catch (error) {
      next(error);
    }
  }

  static getById(req, res) {
    // const { id } = req.params;
    // const note = notes.find((note) => note.id === id);
    // if (!note)
    //   return res.status(404).json({
    //     message: "A nota nao foi achhada",
    //   });
    // return res.json(note);
  }

  static async create(req, res, next) {
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
      const newNote = await NoteModel.create(input);
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

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const result = validatePatialNote(req.body);
      console.log({ result, id });
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
      const updatedNote = await NoteModel.update(id, input);
      console.log({ updatedNote });
      res.json({
        updatedNote,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const { userId } = req;
      const response = await NoteModel.delete(id, userId);
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
