import mysql from "mysql2/promise";
import dotenv from "dotenv";
import userSchema from "../models/user.js";
import bookSchema from "../models/book.js";
import borrowedBookSchema from "../models/borrowedBook.js";

dotenv.config();

const initialPool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

const initializeDatabase = async () => {
  try {
    await initialPool.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(`Database ${process.env.DB_NAME} created or already exists`);

    await db.query(`USE ${process.env.DB_NAME}`);

    await userSchema(db);
    await bookSchema(db);
    await borrowedBookSchema(db);
  } catch (error) {
    console.error("Error initializing database:", error.message);
    process.exit(1);
  }
};

export { db, initializeDatabase };
