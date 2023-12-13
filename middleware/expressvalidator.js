const { body, validationResult } = require('express-validator');

const validateSignup = [
  // validate name
  body('firstName')
  .isLength({ min: 3 })
  .withMessage('name must be at least 3 characters long'),

  body('lastName')
  .isLength({ min: 3 })
  .withMessage('name must be at least 3 characters long'),

  // Validate username
  body('userName')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long')
    .isAlphanumeric()
    .withMessage('Username must only contain letters and numbers'),

  // Validate phoneNumber
  body('phoneNumber')
  .isLength({min:10},{max:10})
  .withMessage('phoneNumber must have 10 digit')
  .isNumeric()
  .withMessage("numbers should be numeric"),

  // Validate email
  body('email')
    .isEmail()
    .withMessage('Invalid email address'),

  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }).withMessage('Must have :-  One Lowercase, One Uppercase, One Number, One Symbol with min-length Eight'),

  // Validate confirm password
  body('confirmPassword').notEmpty().custom(async (confirmPassword,{req})=>{
    const password = req.body.password
    if(confirmPassword !== password) throw 'Confirm password must match'
  }),

  //Validate terms and conditions
  body('acceptTerms').custom(async (acceptTerms,{req})=>{
    if(!acceptTerms) throw "Please Accept Terms"
  })
];

const handleValidationErrors = (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateSignup,
  handleValidationErrors,
};
