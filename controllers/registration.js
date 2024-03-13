import jwt from "jsonwebtoken";
import { validateUser, validatePartialUser } from "../schemas/users.js";

export class RegistrationController {
  constructor ({ UserModel }) {
    this.UserModel = UserModel
  }

  create = async (req, res, next) => {
    try {
      const result = validateUser(req.body);
      if (result.error) {
        return res.status(400).json({
          error: JSON.parse(result.error.message),
        });
      }

      const response = await this.UserModel.create(result);

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

  login = async (req, res, next) => {
    try {
      const result = validateUser(req.body);
      if (result.error) {
        return res.status(400).json({
          error: JSON.parse(result.error.message),
        });
      }
      const response = await this.UserModel.login(result);
      const { success, message, error } = response;
      if (error)
        return res.status(409).json({
          error,
          message,
        });

      const { user } = response;
  
      res.json({
        success,
        data: {
          email: user.email,
          token: user.token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
