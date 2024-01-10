import jwt from "jsonwebtoken";

export function userExtractor(req, res, next) {
  const authorization = req.get("authorization");
  if (!authorization) {
    return res.status(401).json({
      message: "nao tem token",
    });
  }

  let token = null;
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken = {};
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_JWT);
  } catch (error) {}

  if (!decodedToken.id) {
    return res.status(401).json({
      message: "token nao é valido",
    });
  }

  const { id: userId } = decodedToken;

  req.userId = userId;
  next();
}
