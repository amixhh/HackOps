const { body } = require('express-validator');

exports.validateRegistration = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['patient', 'doctor'])
    .withMessage('Invalid role specified'),
  body('name').notEmpty().withMessage('Name is required'),
  body('specialty')
    .if(body('role').equals('doctor'))
    .notEmpty()
    .withMessage('Specialty is required for doctors'),
];

exports.validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];
