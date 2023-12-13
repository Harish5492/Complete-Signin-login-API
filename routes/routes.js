const router = require('express').Router();
const userController = require('../controllers/usercontroller');
const authMiddleware = require('../middleware/authenticate');
const { validateSignup, handleValidationErrors } = require('../middleware/expressvalidator')

router.post('/signUp', validateSignup, handleValidationErrors, userController.signUp)
router.get('/getUser', userController.getUser);
router.get('/getAllUsers', userController.getAllUsers),
router.get('/login', userController.login);
router.put('/updateUser/:id', userController.updateUser);
router.delete('/removeUser/:id', userController.removeUser);
router.put('/forgotPassword/:email', validateSignup[4], validateSignup[5], handleValidationErrors, userController.forgotPassword);
router.get('/generateOTP', userController.generateOTP),
router.get('/otpbyemail',userController.otpbyemail),
router.get('/verifyOTP',userController.verifyOTP),
router.get('/profile', authMiddleware, userController.profile);
router.post('/updatePassword',validateSignup[6],validateSignup[5],handleValidationErrors,userController.updatePassword);



module.exports = router;
