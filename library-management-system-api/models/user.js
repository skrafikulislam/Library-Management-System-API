import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const userSchema = async (db) => {
  await db.query(`
        CREATE TABLE IF NOT EXISTS Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone VARCHAR(15) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('Admin', 'Librarian', 'Member') DEFAULT 'Member',
            isConfirmed BOOLEAN DEFAULT FALSE,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
  console.log("Users table created or already exists");

  // Check if an admin user already exists
  const [existingAdmin] = await db.query("SELECT * FROM Users WHERE role = ?", [
    "Admin",
  ]);

  if (existingAdmin.length === 0) {
    const AdminEmail = "admin@gmail.com";
    const adminPassword = "Admin1234";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await db.query(
      "INSERT INTO Users (name, email, phone, password, role, isConfirmed) VALUES (?, ?, ?, ?, ?, ?)",
      ["Admin User", AdminEmail, "12345678901", hashedPassword, "Admin", true]
    );
    console.log("Initial admin user created: admin@gmail.com / Admin1234");
  } else {
    console.log("Admin user already exists, skipping creation");
  }
};

export default userSchema;
