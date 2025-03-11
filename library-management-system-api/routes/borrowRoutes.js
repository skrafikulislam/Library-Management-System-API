 

import express from "express";
import {
  borrowBook,
  returnBook,
  recordBorrowReturnbyLibrarian,
} from "../controllers/borrowController.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import validate from "../middleware/validate.js";
const router = express.Router();

router.post("/borrow", auth, role("Member"), validate("borrow"), borrowBook);
router.post("/return", auth, role("Member"), validate("borrow"), returnBook);
router.post(
  "/record",
  auth,
  role("Librarian", "Admin"),
  validate("recordBorrowReturn"),
  recordBorrowReturnbyLibrarian
);

export default router;
