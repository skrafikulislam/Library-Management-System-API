# Library Management System API

A RESTful API built with Node.js, Express, and MySQL for managing a library system. This project implements role-based authentication using JWT (JSON Web Tokens) to manage users, books, and borrowing operations, adhering to the specified requirements.

## Project Overview

The Library Management System API provides endpoints for user authentication, book management, borrowing operations, and user administration. It supports three roles—**Admin**, **Librarian**, and **Member**—each with specific permissions. The database is initialized programmatically, and an initial Admin user is created automatically after the `Users` table is set up, enabling the Admin to confirm and manage other users.

### Features

- **Authentication**: User registration with auto-generated passwords sent via email, login with JWT issuance, and role-based access control.
- **Books Management**: CRUD operations for books (Admin-only, except viewing for all roles).
- **Borrowing Operations**: Members can borrow/return books; Librarians can record borrowing/returning for any user.
- **User Management**: Admin can create, update, and delete users.
- **Database**: Programmatic creation of the `library` database and tables (`Users`, `Books`, `BorrowedBooks`).
- **Initial Admin**: An Admin user is created automatically after table setup for user confirmation and management.
- **Validation**: Request data validated using Joi for security and reliability.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MySQL
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Joi
- **Email**: Nodemailer
- **Environment**: dotenv for configuration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- Git
- Postman (for testing)

### Installation

1. **Clone the Repository**:

   git clone <repository-url>
   cd library-management-system
   npm install

- Create a .env file in the root directory based on the example below
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=yourpassword
  DB_NAME=library_db
  JWT_SECRET=yourjwtsecret
  PORT=5000
  EMAIL_USER=your-email@gmail.com
  EMAIL_PASS=your-email-password

- node server.js


API Endpoints

Authentication
POST /api/auth/register: Register a new user (requires Admin confirmation).
POST /api/auth/login: Login and receive a JWT token.

Books Management
POST /api/books: Add a book (Admin only).
GET /api/books: View all books (Admin, Librarian, Member).
PUT /api/books/:id: Update a book (Admin only).
DELETE /api/books/:id: Delete a book (Admin only).

Borrowing Operations
POST /api/borrow/borrow: Borrow a book (Member only).
POST /api/borrow/return: Return a book (Member only).
POST /api/borrow/record: Record borrowing/returning (Librarian only).

User Management
POST /api/users: Create a user (Admin only).
PUT /api/users/:id: Update a user (Admin only).
DELETE /api/users/:id: Delete a user (Admin only).
