import {db} from "../config/db.js";

const borrowBook = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  try {
    const [books] = await db.query("SELECT quantity FROM Books WHERE id = ?", [
      bookId,
    ]);
    if (books[0].quantity <= 0)
      return res
        .status(400)
        .json({ message: "Book unavailable right now", result: books });

    await db.query("INSERT INTO BorrowedBooks (userId, bookId) VALUES (?, ?)", [
      userId,
      bookId,
    ]);
    await db.query("UPDATE Books SET quantity = quantity - 1 WHERE id = ?", [
      bookId,
    ]);
    res.json({ message: "Book borrowed" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const returnBook = async (req, res) => {
  const { bookId } = req.body;
  const userId = req.user.id;

  try {
    const [borrows] = await db.query(
      "SELECT * FROM BorrowedBooks WHERE userId = ? AND bookId = ? AND returnDate IS NULL",
      [userId, bookId]
    );
    if (!borrows[0])
      return res.status(400).json({ message: "No active borrow record" });

    await db.query("UPDATE BorrowedBooks SET returnDate = NOW() WHERE id = ?", [
      borrows[0].id,
    ]);
    await db.query("UPDATE Books SET quantity = quantity + 1 WHERE id = ?", [
      bookId,
    ]);
    res.json({ message: "Book returned" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recordBorrowReturnbyLibrarian = async (req, res) => {
  const { userId, bookId, action } = req.body;

  try {
    if (action === "borrow") {
      const [books] = await db.query(
        "SELECT quantity FROM Books WHERE id = ?",
        [bookId]
      );
      if (books[0].quantity <= 0)
        return res.status(400).json({ message: "Book unavailable" });

      await db.query(
        "INSERT INTO BorrowedBooks (userId, bookId) VALUES (?, ?)",
        [userId, bookId]
      );
      await db.query("UPDATE Books SET quantity = quantity - 1 WHERE id = ?", [
        bookId,
      ]);
      res.json({ message: `Borrow recorded for ${userId}` });
    } else if (action === "return") {
      const [borrows] = await db.query(
        "SELECT * FROM BorrowedBooks WHERE userId = ? AND bookId = ? AND returnDate IS NULL",
        [userId, bookId]
      );
      if (!borrows[0])
        return res.status(400).json({ message: "No active borrow record" });

      await db.query(
        "UPDATE BorrowedBooks SET returnDate = NOW() WHERE id = ?",
        [borrows[0].id]
      );
      await db.query("UPDATE Books SET quantity = quantity + 1 WHERE id = ?", [
        bookId,
      ]);
      res.json({ message: `Return recorded for ${userId}` });
    } else {
      res.status(400).json({ message: "Invalid action" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { recordBorrowReturnbyLibrarian, borrowBook, returnBook };
