import {db} from "../config/db.js";

const addBook = async (req, res) => {
  const { title, author, isbn, quantity } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Books (title, author, isbn, quantity) VALUES (?, ?, ?, ?)",
      [title, author, isbn, quantity || 1]
    );
    res.status(201).json({ message: "Book added", bookId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, isbn, quantity } = req.body;
  try {
    await db.query(
      "UPDATE Books SET title = ?, author = ?, isbn = ?, quantity = ? WHERE id = ?",
      [title, author, isbn, quantity, id]
    );
    res.json({ message: "Book updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }   
};
   
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Books WHERE id = ?", [id]);
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const [books] = await db.query("SELECT * FROM Books");
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllBooks, deleteBook, updateBook, addBook };
