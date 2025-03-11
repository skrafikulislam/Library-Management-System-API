 

import express from "express";
import {
  addBook,
  updateBook,
  deleteBook,
  getAllBooks,
} from "../controllers/bookController.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import validate from "../middleware/validate.js";
const router = express.Router();

router.post("/", auth, role("Admin"), validate("book"), addBook);
router.put("/:id", auth, role("Admin"), validate("book"), updateBook);
router.delete("/:id", auth, role("Admin"), deleteBook);
router.get("/", auth, role("Admin", "Librarian", "Member"), getAllBooks);
           
export default router;
        