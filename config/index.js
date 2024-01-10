import dotenv from "dotenv";

dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT ?? 1234,
  databaseURL: process.env.DATABASE_URL,
};

export default config;
