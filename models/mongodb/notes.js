import mongoose from "mongoose";
import { CategoryModel } from "./categories.js";
import { UserModel } from "./users.js";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String
    },
    is_archived: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }]

})

const Note = mongoose.model("Note", noteSchema);

export class NoteModel {
  static async getAll({userId, page = 1, limit = 10}) {
    try {
      var lastPage = 1;
      const finalNotes = [];
      
      const notesCount = await Note.countDocuments({ userId })
      
      lastPage = Math.ceil(notesCount/limit);
      const offset = (page - 1) * limit;

      const notes = await Note.find({ userId }).limit(limit).skip(offset);

      const categories = await CategoryModel.getAll();

      for (const note of notes) {
        const categoriesInNote = note.categories.map( item => {
          return categories.find(category => item.toString() === category._id.toString())
        })
        note.categories = categoriesInNote;
      }

      return {
        data: notes,
        meta: {
          currentPage: page,
          totalPages: lastPage,
          pageSize: limit,
          totalNotes: notesCount
        }
      };
    } catch(error) {
      console.log(error)
    }
  }

  static async create(input) {
    const { title, content, categories, userId } = input;

    try {

      const note = new Note(input)
      const noteSaved = await note.save()
      
      return noteSaved;
    } catch(error) {
      console.log(error);
    }
  }

  static async delete(id, userId) {
    if (!mongoose.Types.ObjectId.isValid(id)){
      const error = new Error("No es un ID válido");
      return {msg: error.message}
    }
    try {
        const note = await Note.findById(id);

        if(note.userId._id.toString() !== userId) {
            return {error: true, msg: "Acción no válida"}
        }

        const noteDeleted = await note.deleteOne();
        return noteDeleted
    } catch(error) {
        console.log(error)
    }
  }

  static async update(id, input) {
    if (!mongoose.Types.ObjectId.isValid(id)){
      const error = new Error("No es un ID válido");
      return {msg: error.message}
    }
    try {
        const { userId } = input;
        const note = await Note.findById(id);
        if(note.userId._id.toString() !== userId) {
            return {error: true, msg: "Acción no válida"}
        }
    
        const { title, content, is_archived, categories } = input;
        let newCategories;
        if(categories) {
          const allCategories = await CategoryModel.getAll();
          newCategories = categories.map( item => {
            return allCategories.find(category => {
              return item.toString() === category._id.toString()
            })
          })
        }

        note.title = title || note.title;
        note.content = content || note.content;
        note.is_archived = is_archived !== undefined && is_archived !== null ? is_archived : note.is_archived;
        note.categories = newCategories || note.categories;


        const noteUpdated = await note.save();
        return noteUpdated
    } catch(error) {
        console.log(error)
    }
  }
}
