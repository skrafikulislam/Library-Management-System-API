import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import validate from "../middleware/validate.js";
const router = express.Router();

router.post("/", auth, role("Admin"), validate("createUser"), createUser);
router.put("/:id", auth, role("Admin"), validate("updateUser"), updateUser);
router.delete("/:id", auth, role("Admin"), deleteUser);

export default router;
