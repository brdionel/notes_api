import conectarDB from "./config/mongodb.js";
import { createApp } from "./index.js";

import { CategoryModel } from "./models/mongodb/categories.js";
import { NoteModel } from "./models/mongodb/notes.js";
import { UserModel } from "./models/mongodb/users.js";

conectarDB();
createApp({ CategoryModel, NoteModel, UserModel})