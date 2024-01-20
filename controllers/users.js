import { UserModel } from "../models/users.js";
import { validatePartialUser } from "../schemas/users.js";

export class UsersController {
  static async getAll(req, res, next) {
    try {
      const { email } = req.query;
      const response = await UserModel.getAll({ email });
      res.json(
        response,
      );
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.getById(id);
      if (!user)
        return res
          .status(404)
          .json({ message: "nao achamos user nenhum com esse id" });
      res.json({
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const result = validatePartialUser(req.body);
      if (result.error) {
        return res.status(400).json({
          error: JSON.parse(result.error.message),
        });
      }
      const updatedUser = await UserModel.update(id, result);
      res.json({
        updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;
      const response = await UserModel.delete(id);
      if (!response)
        return res.status(404).json({
          message: "User not found",
        });
      return res.json({
        message: "User deleted",
        userIdDeleted: id,
      });
    } catch (error) {
      next(error);
    }
  }
}
