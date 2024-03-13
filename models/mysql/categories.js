import config from "../../config/index.js";

import mysql from "mysql2/promise";

const connectionConfig = config.databaseURL;

const connection = await mysql.createConnection(connectionConfig);

export class CategoryModel {
  static async getAll() {
    try {
      const [categories] = await connection.query(
        "SELECT * FROM categoriesNotes;"
      );
      return categories;
    } catch (error) {
      throw new Error("Error getting categories");
    }
  }

  
}
