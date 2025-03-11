import { db } from "../config/db.js";
import { sendEmail } from "../utils/email.js";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  const { name, email, phone, role } = req.body;
  const password = `${name.split(" ")[0]}${email.split("@")[0]}${phone.slice(
    -4
  )}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [users] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    if (users[0])
      return res.status(404).json({ message: "User already exists in database" });
    await db.query(
      "INSERT INTO Users (name, email, phone, password, role, isConfirmed) VALUES (?, ?, ?, ?, ?, TRUE)",
      [name, email, phone, hashedPassword, role || "Member"]
    );
    await sendEmail(email, "Your Password", `Your password is: ${password}`);
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, role, isConfirmed } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    if (!users[0]) return res.status(404).json({ message: "User not found" });

    await db.query(
      "UPDATE Users SET name = ?, email = ?, phone = ?, role = ?, isConfirmed = ? WHERE id = ?",
      [name, email, phone, role, isConfirmed, id]
    );
    res.json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [users] = await db.query("SELECT * FROM Users WHERE id = ?", [id]);
    if (!users[0]) return res.status(404).json({ message: "User not found" });
    await db.query("DELETE FROM Users WHERE id = ?", [id]);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { deleteUser, updateUser, createUser };
