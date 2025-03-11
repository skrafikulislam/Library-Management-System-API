import mysql from 'mysql2/promise';

const borrowedBookSchema = async (db) => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS BorrowedBooks (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            bookId INT NOT NULL,
            borrowDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            returnDate TIMESTAMP NULL,
            FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
            FOREIGN KEY (bookId) REFERENCES Books(id) ON DELETE CASCADE
        )
    `);
    console.log('BorrowedBooks table created or already exists');
};

export default borrowedBookSchema;