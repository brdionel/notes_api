import express from "express";
import { createNoteRouter } from "./routes/notes.js";
import { createCategoryRouter } from "./routes/categories.js";
import { createRegistrationRouter } from "./routes/registration.js";
import { createUserRouter } from "./routes/users.js";
import config from "./config/index.js";
import { corsMiddlewares } from "./middleware/cors.js";
import { errorHandler, logErrors, wrapErrors } from "./middleware/errors.js";

export const createApp = ({CategoryModel, NoteModel, UserModel}) => {
  const PORT = config.port;
  const app = express();

  app.use(express.json());
  app.use(corsMiddlewares());
  
  app.use("/notes", createNoteRouter({NoteModel}));
  app.use("/categories", createCategoryRouter({CategoryModel}));
  app.use("/users", createUserRouter({UserModel}));
  app.use("/auth", createRegistrationRouter({UserModel}));
  
  // Error middlewares
  app.use(logErrors);
  app.use(wrapErrors);
  app.use(errorHandler);
  
  app.use((req, res) => {
    res.status(404).send("<strong>Ruim request <br/> Nao achamaos nada</strong>");
  });
  
  app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
  });
}

