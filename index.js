import express from "express";
import notesRouter from "./routes/notes.js";
import categoriesRouter from "./routes/categories.js";
import imagesRouter from "./routes/images.js";
import registrationRouter from "./routes/registration.js";
import usersRouter from "./routes/users.js";
import config from "./config/index.js";
import { corsMiddlewares } from "./middleware/cors.js";
import { errorHandler, logErrors, wrapErrors } from "./middleware/errors.js";

const PORT = config.port;
const app = express();
app.use(express.json());
app.use(corsMiddlewares());

app.use("/notes", notesRouter);
app.use("/categories", categoriesRouter);
app.use("/images", imagesRouter);
app.use("/users", usersRouter);
app.use("/auth", registrationRouter);

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
