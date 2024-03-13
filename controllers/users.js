import { validatePartialUser } from "../schemas/users.js";

export class UsersController {
  
  constructor ({ UserModel }) {
    this.UserModel = UserModel
  }

  getAll = async (req, res, next) => {
    try {
      const { email } = req.query;
      const response = await this.UserModel.getAll({ email });
      res.json(
        response,
      );
    } catch (error) {
      next(error);
    }
  }

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.UserModel.getById(id);
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

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = validatePartialUser(req.body);
      if (result.error) {
        return res.status(400).json({
          error: JSON.parse(result.error.message),
        });
      }
      const updatedUser = await this.UserModel.update(id, result);
      res.json({
        updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await this.UserModel.delete(id);
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
