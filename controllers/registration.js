import jwt from "jsonwebtoken";
import { UserModel } from "../models/users.js";
import { validateUser, validatePartialUser } from "../schemas/users.js";

export class RegistrationController {
  static async create(req, res, next) {
    try {
      const result = validateUser(req.body);
      if (result.error) {
        return res.status(400).json({
          error: JSON.parse(result.error.message),
        });
      }
      const response = await UserModel.create(result);
      if (response.error) {
        return res.status(400).json(response);
      }

      const userForToken = {
        id: response.id,
        email: response.email,
      };
      const token = jwt.sign(userForToken, process.env.SECRET_JWT, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      res.json({
        success: true,
        data: {
          email: userForToken.email,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const result = validateUser(req.body);
      if (result.error) {
        return res.status(400).json({
          error: JSON.parse(result.error.message),
        });
      }
      const response = await UserModel.login(result);
      const { success, message, error } = response;
      if (error)
        return res.status(409).json({
          error,
          message,
        });

      const { user } = response;
      const userForToken = {
        id: user.id,
        email: user.email,
      };
      const token = jwt.sign(userForToken, process.env.SECRET_JWT, {
        expiresIn: 60 * 60 * 24 * 7,
      });
      res.json({
        success,
        data: {
          email: user.email,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
