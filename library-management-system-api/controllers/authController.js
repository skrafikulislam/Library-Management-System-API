import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {db} from "../config/db.js";
import { sendEmail } from "../utils/email.js";

const register = async (req, res) => {
  const { name, email, phone } = req.body;

  const password = `${name.split(" ")[0]}${email.split("@")[0]}${phone.slice(
    -4
  )}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await db.query(
      "INSERT INTO Users (name, email, phone, password) VALUES (?, ?, ?, ?)",
      [name, email, phone, hashedPassword]
    );
    await sendEmail(email, "Your Password", `Your password is: ${password}`);
    res.status(201).json({
      message: "User registered. Awaiting admin confirmation.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error in Register",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    const user = users[0];

    if (
      !user ||
      !user.isConfirmed ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res
        .status(401)
        .json({ message: "Invalid credentials or unconfirmed account from Admin" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "4h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login };
