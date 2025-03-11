import  mysql from 'mysql2/promise';

const bookSchema = async (db) => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS Books (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            isbn VARCHAR(13) UNIQUE NOT NULL,
            quantity INT DEFAULT 1,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log('Books table created or already exists');
};

export default bookSchema;