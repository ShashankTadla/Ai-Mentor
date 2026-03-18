import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: false,
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Neon PostgreSQL using Sequelize");
  } catch (error) {
    const messageParts = ["❌ Unable to connect:"];
    if (error && typeof error === "object") {
      if ("message" in error && error.message) {
        messageParts.push(error.message);
      }
      if ("code" in error && error.code) {
        messageParts.push(`(code: ${error.code})`);
      }
    }
    console.error(messageParts.join(" "));
    if (process.env.DB_LOG_VERBOSE_ERRORS === "true") {
      console.error(error);
    }
    throw error;
  }
}

export { sequelize, connectDB };
export default connectDB;
