import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import config from "../config/index.js";

const connectionConfig = config.databaseURL;

const connection = await mysql.createConnection(connectionConfig);

export class UserModel {
  static async create(input) {
    try {
      const { email, password } = input.data;

      const [userWithEmail] = await connection.query(
        `SELECT * FROM users WHERE email = ?;`,
        [email]
      );
      if (userWithEmail.length > 0)
        return {
          error: true,
          message: "Email already uses",
        };

      const hash = await bcrypt.hash(password, 10);
      const [response] = await connection.query(
        `INSERT INTO users (email, password) VALUES (?, ?);`,
        [email, hash]
      );
      const { insertId } = response;
      const newUser = {
        id: insertId,
        email,
      };
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getAll({ email }) {
    if (email) {
      const [user] = await connection.query(
        "SELECT * FROM users WHERE email = ?;",
        [email]
      );
      if (!user.length) return null;
      return true;
    }
    const [users] = await connection.query("SELECT * FROM users;");
    return users;
  }

  static async getById(id) {
    const [user] = await connection.query("SELECT * FROM users WHERE id = ?;", [
      id,
    ]);
    return user;
  }

  static async login(input) {
    try {
      const { email, password } = input.data;
      const [userWithEmail] = await connection.query(
        `SELECT * FROM users WHERE email = ?;`,
        [email]
      );
      if (userWithEmail.length === 0)
        return {
          error: true,
          message: "No user with this email",
        };

      const resultCompareHash = await bcrypt.compare(
        password,
        userWithEmail[0].password
      );
      if (!resultCompareHash)
        return {
          error: true,
          message: "The password is not valid",
        };
      return {
        success: true,
        user: {
          id: userWithEmail[0].id,
          email: userWithEmail[0].email,
        },
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async update(id, input) {
    try {
      const { ...updatedFields } = input.data;
      if (Object.keys(updatedFields).includes("password")) {
        const hash = await bcrypt.hash(updatedFields.password, 10);
        updatedFields.password = hash;
      }

      const setClause = Object.keys(updatedFields)
        .map((field) => `${field} = ?`)
        .join(", ");

      const updateValues = [...Object.values(updatedFields), id];

      await connection.query(
        `UPDATE users SET ${setClause} WHERE id = ?`,
        updateValues
      );

      const updatedUser = {
        id,
        ...updatedFields,
      };
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user");
    }
  }

  static async delete(id) {
    try {
      const [response] = await connection.query(
        "DELETE FROM users WHERE id = ?;",
        [id]
      );
      const { affectedRows } = response;
      if (affectedRows === 0) return null;
      return true;
    } catch (error) {
      throw new Error("Error deleting user");
    }
  }
}
