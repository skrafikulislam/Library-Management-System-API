import Joi from "joi";

const schemas = {
  // Authentication
  register: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required(),
  }),
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),

  // Books Management
  book: Joi.object({
    title: Joi.string().min(1).max(255).required(),
    author: Joi.string().min(1).max(255).required(),
    isbn: Joi.string()
      .length(5)
      .pattern(/^[0-9]+$/)
      .required(),
    quantity: Joi.number().integer().min(1).default(1),
  }),

  // Borrowing Operations
  borrow: Joi.object({
    bookId: Joi.number().integer().required(),
  }),
  recordBorrowReturn: Joi.object({
    userId: Joi.number().integer().required(),
    bookId: Joi.number().integer().required(),
    action: Joi.string().valid("borrow", "return").required(),
  }),

  // User Management
  createUser: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required(),
    role: Joi.string().valid("Admin", "Librarian", "Member").default("Member"),
  }),
  updateUser: Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/),
    role: Joi.string().valid("Admin", "Librarian", "Member"),
    isConfirmed: Joi.boolean(),
  }).or("name", "email", "phone", "role", "isConfirmed"), // At least one field required
};

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schemas[schema].validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }
    next();
  };
};

export default validate;
