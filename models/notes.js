import mysql from "mysql2/promise";
import config from "../config/index.js";

const connectionConfig = config.databaseURL;

const connection = await mysql.createConnection(connectionConfig);

export class NoteModel {
  static async getAll(userId) {
    try {
      await connection.beginTransaction();
      const finalNotes = [];
      const [notes] = await connection.query(
        "SELECT * FROM notes WHERE userId = ?;",
        [userId]
      );
      const [categories] = await connection.query(
        "SELECT * FROM categoriesNotes;"
      );
      for (const note of notes) {
        const [note_categories] = await connection.query(
          "SELECT category_id from notes_category where note_id = ?;",
          [note.id]
        );
        const categoryiesFromNotes = note_categories.map(
          (noteCategory) => noteCategory.category_id
        );
        const filteredCategories = categories.filter((category) =>
          categoryiesFromNotes.includes(category.id)
        );
        const noteToAdd = {
          ...note,
          categories: filteredCategories,
        };
        finalNotes.push(noteToAdd);
      }
      await connection.commit();
      return finalNotes;
    } catch (error) {
      throw new Error("Error getting notes");
    }
  }

  static async create(input) {
    const { title, content, categories, userId } = input;

    try {
      await connection.beginTransaction();

      const [response] = await connection.query(
        `INSERT INTO notes (title, content, userId) VALUES (?, ?, ?);`,
        [title, content, userId]
      );

      const { insertId } = response;

      let newNote = null;

      if (categories.length) {
        for (const categoryId of categories) {
          await connection.query(
            "INSERT INTO notes_category (note_id, category_id) VALUES (?, ?)",
            [insertId, categoryId]
          );
        }

        const [categoriesFounded] = await connection.query(
          `SELECT id, name FROM categoriesNotes WHERE id IN (?);`,
          [[...categories]]
        );

        await connection.commit();
        newNote = {
          id: insertId,
          ...input,
          categories: categoriesFounded,
        };
      }
      await connection.commit();
      newNote = {
        id: insertId,
        ...input,
      };
      return newNote;
    } catch (error) {
      await connection.rollback();
      throw new Error("Error creating note");
    }
  }

  static async delete(id, userId) {
    try {
      const [response] = await connection.query(
        "DELETE FROM notes WHERE userId = ? AND id = ?;",
        [userId, id]
      );
      const { affectedRows } = response;
      if (affectedRows === 0) return null;
      return true;
    } catch (error) {
      throw new Error("Error deleting a note");
    }
  }

  static async update(id, input) {
    try {
      await connection.beginTransaction();
      const { categories, ...updatedFields } = input;
      const setClause = Object.keys(updatedFields)
        .map((field) => `${field} = ?`)
        .join(", ");

      const updateValues = [...Object.values(updatedFields), id];

      const [responseUpdate] = await connection.query(
        `UPDATE notes SET ${setClause} WHERE id = ?`,
        updateValues
      );

      if (!categories || !categories.length) {
        await connection.commit();
        const updatedNote = {
          id,
          ...updatedFields,
        };
        return updatedNote;
      }

      const [response] = await connection.query(
        "DELETE FROM notes_category WHERE note_id = ?;",
        [id]
      );

      for (const categoryId of categories) {
        await connection.query(
          "INSERT INTO notes_category (note_id, category_id) VALUES (?, ?)",
          [id, categoryId]
        );
      }

      const [categoriesFounded] = await connection.query(
        `SELECT id, name FROM categoriesNotes WHERE id IN (?);`,
        [[...categories]]
      );
      
      await connection.commit();

      const updatedNote = {
        id,
        ...updatedFields,
        categories: categoriesFounded,
      };
      return updatedNote;
    } catch (error) {
      await connection.rollback();
      throw new Error("Error updating note");
    }
  }
}
